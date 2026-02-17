import Slide from "../../../components/slides/Slide";
import CodeBlock from "../../../components/slides/CodeBlock";
import { CornerSquares } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

const decisions = [
    {
        label: "Isolation",
        description:
            "Each session gets its own VM — own kernel, own filesystem.",
        code: `const sandbox = getSandbox(env.Sandbox, sessionId);`,
        fileName: "index.ts",
    },
    {
        label: "Runtime",
        description: "Background processes, file I/O, real bash sessions.",
        code: `const server = await sandbox.startProcess("npx vite --host");
await server.waitForPort(5173);

const source = await sandbox.readFile("src/App.tsx");
await sandbox.writeFile("src/App.tsx", modified);`,
        fileName: "sandbox.ts",
    },
    {
        label: "Networking",
        description: "One call turns an internal port into a public URL.",
        code: `const { url } = await sandbox.exposePort(5173, { hostname });`,
        fileName: "sandbox.ts",
    },
    {
        label: "Persistence",
        description:
            "Modified files saved to storage — the user comes back, the work is there.",
        code: `await env.DIFFS.put(
  \`sessions/\${sessionId}/App.tsx\`,
  source,
);`,
        fileName: "sandbox.ts",
    },
];

function AnnotatedCodeSlide() {
    const step = useStep();
    const active = Math.min(step, decisions.length - 1);
    const current = decisions[active];

    return (
        <Slide hideGoose edgeToEdge>
            <div className="relative flex h-full w-full flex-col border border-(--slide-border)">
                <CornerSquares />
                <div className="grid h-full grid-cols-[1.6fr_1fr]">
                    <div className="relative flex items-center border-r border-(--slide-border) p-6">
                        <CodeBlock title={current.fileName} className="w-full">
                            {current.code}
                        </CodeBlock>
                    </div>

                    <div className="flex h-full flex-col">
                        {decisions.map((d, i) => {
                            const isActive = i === active;
                            return (
                                <div
                                    key={d.label}
                                    className="relative flex flex-1 flex-col justify-center gap-1.5 border-b border-(--slide-border) px-6 transition-colors duration-300 last:border-b-0"
                                    style={{
                                        backgroundColor: isActive
                                            ? "var(--slide-bg-active)"
                                            : "transparent",
                                    }}
                                >
                                    <div
                                        className="absolute top-0 bottom-0 left-0 w-1 transition-opacity duration-300"
                                        style={{
                                            backgroundColor:
                                                "var(--slide-accent)",
                                            opacity: isActive ? 1 : 0,
                                        }}
                                    />
                                    <p
                                        className="font-lufga text-base font-medium transition-opacity duration-300"
                                        style={{
                                            opacity: isActive ? 1 : 0.5,
                                        }}
                                    >
                                        {d.label}
                                    </p>
                                    <p
                                        className="text-sm leading-relaxed text-(--slide-fg-muted) transition-opacity duration-300"
                                        style={{
                                            opacity: isActive ? 1 : 0.4,
                                        }}
                                    >
                                        {d.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Slide>
    );
}

AnnotatedCodeSlide.steps = 4;
AnnotatedCodeSlide.edgeToEdge = true;
AnnotatedCodeSlide.notes = `Each of these lines maps to one of the four decisions.

[1] Isolation: getSandbox provisions an isolated environment — its own VM, own kernel, own filesystem.

[2] Runtime: startProcess, readFile, writeFile — background processes, file I/O, real bash sessions.

[3] Networking: exposePort creates the preview URL — routing from the internet to a specific port.

[4] Persistence: modified files saved to storage — the user comes back, the work is there.`;

export default AnnotatedCodeSlide;
