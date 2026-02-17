import { useState, useCallback, useRef, useEffect } from "react";
import type { TerminalLine } from "./TerminalMockup";

type SandboxStatus =
  | "idle"
  | "connecting"
  | "restoring"
  | "running"
  | "done"
  | "error"
  | "full"
  | "expired";

interface UseSandboxOptions {
  url: string;
  sessionKey?: string;
}

interface UseSandboxResult {
  lines: TerminalLine[];
  previewUrl: string | null;
  status: SandboxStatus;
  elapsed: number;
  hasStoredSession: boolean;
  start: (prompt: string) => void;
  restore: () => void;
}

const SESSION_STORAGE_PREFIX = "sandbox-session:";

function getStoredSession(key: string): string | null {
  try {
    return localStorage.getItem(`${SESSION_STORAGE_PREFIX}${key}`);
  } catch {
    return null;
  }
}

function storeSession(key: string, sessionId: string): void {
  try {
    localStorage.setItem(`${SESSION_STORAGE_PREFIX}${key}`, sessionId);
  } catch {}
}

function stepLineType(step: string): TerminalLine["type"] {
  if (step === "agent") return "info";
  if (step === "restoring") return "info";
  return "output";
}

type ServerMessage =
  | {
      type: "welcome";
      sessionId: string;
      stage: string;
      previewUrl?: string;
      epoch: number;
    }
  | { type: "ready" }
  | { type: "status"; step: string; message: string; epoch: number }
  | { type: "preview"; url: string; epoch: number }
  | { type: "done"; sessionId: string; url?: string; epoch: number }
  | { type: "restored"; sessionId: string; url?: string; epoch: number }
  | { type: "error"; message: string; epoch?: number }
  | { type: "full"; active: number }
  | { type: "expired" };

export function useSandbox({
  url,
  sessionKey = "default",
}: UseSandboxOptions): UseSandboxResult {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<SandboxStatus>("idle");
  const [elapsed, setElapsed] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const epochRef = useRef(0);
  const pendingPromptRef = useRef<string | null>(null);

  const stopTimer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  const startTimer = useCallback(() => {
    cancelAnimationFrame(rafRef.current); // Prevent double-RAF loops
    startTimeRef.current = performance.now();
    const tick = () => {
      setElapsed((performance.now() - startTimeRef.current) / 1000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const addLine = useCallback(
    (text: string, type: TerminalLine["type"] = "output") => {
      setLines((prev) => [...prev, { text, type }]);
    },
    [],
  );

  useEffect(() => {
    return () => {
      stopTimer();
      wsRef.current?.close();
    };
  }, [stopTimer]);

  const connect = useCallback(() => {
    wsRef.current?.close();
    wsRef.current = null;

    setStatus("connecting");
    setElapsed(0);
    // Do NOT setLines([]) here — lines are set by start() before calling connect()

    const existingSession = getStoredSession(sessionKey);
    const wsUrl = new URL(url);
    if (existingSession) {
      wsUrl.searchParams.set("session", existingSession);
    }

    const ws = new WebSocket(wsUrl.toString());
    wsRef.current = ws;

    ws.addEventListener("open", () => {
      ws.send(JSON.stringify({ type: "hello" }));
    });

    ws.addEventListener("message", (event) => {
      // Stale socket guard: if wsRef moved on, this socket is dead to us
      if (wsRef.current !== ws) return;

      let msg: ServerMessage;
      try {
        msg = JSON.parse(event.data as string);
      } catch {
        return;
      }

      // Epoch filtering for operation messages: drop if epoch < our current max
      if ("epoch" in msg && msg.epoch !== undefined) {
        if (msg.epoch < epochRef.current) return;
        epochRef.current = msg.epoch;
      }

      switch (msg.type) {
        case "welcome": {
          storeSession(sessionKey, msg.sessionId);

          if (msg.previewUrl) {
            setPreviewUrl(msg.previewUrl);
          }

          if (msg.stage === "running") {
            setStatus("running");
            startTimer();
            addLine("Session in progress…", "info");
          } else if (msg.stage === "restoring") {
            setStatus("restoring");
            startTimer();
            addLine("Restoring session…", "info");
          } else if (msg.stage === "done") {
            setStatus("done");
            addLine("Session restored", "success");
          }
          // stage "idle" → wait for "ready" (follows immediately if no manifest)
          break;
        }

        case "ready": {
          const pending = pendingPromptRef.current;
          if (pending) {
            pendingPromptRef.current = null;
            ws.send(JSON.stringify({ type: "start", prompt: pending }));
          } else {
            // No pending prompt — transition to input-ready state
            setStatus((prev) => {
              if (prev === "connecting" || prev === "error") return "idle";
              if (prev === "restoring") return "done";
              return prev;
            });
          }
          break;
        }

        case "status": {
          setStatus((prev) => {
            if (prev === "running" || prev === "restoring") return prev;
            return msg.step === "restoring" ? "restoring" : "running";
          });
          addLine(msg.message, stepLineType(msg.step));
          break;
        }

        case "preview": {
          setPreviewUrl(msg.url);
          addLine(`Preview: ${msg.url}`, "success");
          break;
        }

        case "done": {
          if (msg.url) setPreviewUrl(msg.url);
          addLine("Done!", "success");
          setStatus("done");
          stopTimer();
          break;
        }

        case "restored": {
          if (msg.url) setPreviewUrl(msg.url);
          addLine("Session restored", "success");
          // Don't set status here — wait for "ready" which follows immediately
          stopTimer();
          break;
        }

        case "error": {
          pendingPromptRef.current = null;
          addLine(`Error: ${msg.message}`, "error");
          setStatus("error");
          stopTimer();
          break;
        }

        case "full": {
          setStatus("full");
          addLine(
            `Service at capacity (${msg.active} active sessions)`,
            "error",
          );
          break;
        }

        case "expired": {
          pendingPromptRef.current = null;
          setPreviewUrl(null);
          setStatus("expired");
          addLine("Sandbox expired", "info");
          stopTimer();
          break;
        }
      }
    });

    ws.addEventListener("close", () => {
      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    });

    ws.addEventListener("error", () => {
      if (wsRef.current !== ws) return;
      pendingPromptRef.current = null;
      setStatus("error");
      addLine("Connection failed", "error");
      stopTimer();
    });
  }, [url, sessionKey, addLine, startTimer, stopTimer]);

  const hasStoredSession = Boolean(getStoredSession(sessionKey));

  const restore = useCallback(() => {
    // Connect without a pending prompt — server restores from R2,
    // sends ready, client lands in "done" state with preview
    pendingPromptRef.current = null;
    setLines([]);
    startTimer();
    connect();
  }, [connect, startTimer]);

  const start = useCallback(
    (prompt: string) => {
      const ws = wsRef.current;

      if (!ws || ws.readyState !== WebSocket.OPEN) {
        // No open connection — save prompt, show command, connect
        pendingPromptRef.current = prompt;
        setLines([{ text: `sandbox "${prompt}"`, type: "command" }]);
        startTimer();
        connect();
        return;
      }

      // WS is open — send start directly (re-run from done/idle state)
      pendingPromptRef.current = null;
      setLines([{ text: `sandbox "${prompt}"`, type: "command" }]);
      setStatus("running");
      setPreviewUrl(null);
      startTimer();
      ws.send(JSON.stringify({ type: "start", prompt }));
    },
    [connect, startTimer],
  );

  return { lines, previewUrl, status, elapsed, hasStoredSession, start, restore };
}
