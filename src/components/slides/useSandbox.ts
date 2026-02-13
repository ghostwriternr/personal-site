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
  prompt: string;
  sessionKey?: string;
}

interface UseSandboxResult {
  lines: TerminalLine[];
  previewUrl: string | null;
  status: SandboxStatus;
  elapsed: number;
  start: () => void;
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

interface WelcomeMessage {
  type: "welcome";
  socketId: string;
  role: "driver" | "viewer";
  session: { sessionId: string; stage: string; previewUrl?: string };
}
interface PromptMessage {
  type: "prompt";
}
interface StatusMessage {
  type: "status";
  step: string;
  message: string;
}
interface PreviewMessage {
  type: "preview";
  url: string;
}
interface DoneMessage {
  type: "done";
  sessionId: string;
  url?: string;
}
interface RestoredMessage {
  type: "restored";
  sessionId: string;
  url?: string;
}
interface ErrorMessage {
  type: "error";
  message: string;
}
interface FullMessage {
  type: "full";
  active: number;
}
interface RoleMessage {
  type: "role";
  driverSocketId: string;
}
interface ExpiredMessage {
  type: "expired";
}

type ServerMessage =
  | WelcomeMessage
  | PromptMessage
  | StatusMessage
  | PreviewMessage
  | DoneMessage
  | RestoredMessage
  | ErrorMessage
  | FullMessage
  | RoleMessage
  | ExpiredMessage;

export function useSandbox({
  url,
  prompt,
  sessionKey = "default",
}: UseSandboxOptions): UseSandboxResult {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<SandboxStatus>("idle");
  const [elapsed, setElapsed] = useState(0);

  const wsRef = useRef<WebSocket | null>(null);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);
  const waitingForPromptRef = useRef(false);
  const roleRef = useRef<"driver" | "viewer">("viewer");

  const stopTimer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  const startTimer = useCallback(() => {
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

    setStatus("connecting");
    setLines([]);
    setPreviewUrl(null);
    setElapsed(0);

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
      let msg: ServerMessage;
      try {
        msg = JSON.parse(event.data as string);
      } catch {
        return;
      }

      switch (msg.type) {
        case "welcome": {
          roleRef.current = msg.role;
          storeSession(sessionKey, msg.session.sessionId);

          if (msg.session.previewUrl) {
            setPreviewUrl(msg.session.previewUrl);
          }

          if (msg.session.stage === "running") {
            setStatus("running");
            startTimer();
            addLine("Session in progress…", "info");
          } else if (msg.session.stage === "restoring") {
            setStatus("restoring");
            startTimer();
            addLine("Restoring session…", "info");
          } else if (msg.session.stage === "done") {
            setStatus("done");
          }
          break;
        }

        case "prompt": {
          // waitingForPromptRef bridges the gap between start() (called before
          // the WS is open) and the server's prompt message (arriving later).
          // Without it the user would have to press Enter twice.
          if (waitingForPromptRef.current) {
            waitingForPromptRef.current = false;
            ws.send(JSON.stringify({ type: "start", prompt }));
          } else {
            setStatus("idle");
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
          setStatus("done");
          stopTimer();
          break;
        }

        case "error": {
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
          setPreviewUrl(null);
          setStatus("expired");
          addLine("Sandbox expired", "info");
          break;
        }

        case "role":
          break;
      }
    });

    ws.addEventListener("close", () => {
      wsRef.current = null;
    });

    ws.addEventListener("error", () => {
      setStatus("error");
      addLine("Connection failed", "error");
      stopTimer();
    });
  }, [url, prompt, sessionKey, addLine, startTimer, stopTimer]);

  const start = useCallback(() => {
    const ws = wsRef.current;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      waitingForPromptRef.current = true;
      setLines([{ text: `sandbox "${prompt}"`, type: "command" }]);
      startTimer();
      connect();
      return;
    }

    if (roleRef.current === "driver") {
      waitingForPromptRef.current = false;
      setLines([{ text: `sandbox "${prompt}"`, type: "command" }]);
      setStatus("running");
      setPreviewUrl(null);
      startTimer();
      ws.send(JSON.stringify({ type: "start", prompt }));
    }
  }, [prompt, connect, startTimer]);

  return { lines, previewUrl, status, elapsed, start };
}
