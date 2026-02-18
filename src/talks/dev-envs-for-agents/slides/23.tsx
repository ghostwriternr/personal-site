import Slide from "../../../components/slides/Slide";
import CodeBlock from "../../../components/slides/CodeBlock";

const sdkCode = `const sandbox = getSandbox(env.Sandbox, sessionId);

const server = await sandbox.startProcess("npx vite --host");
await server.waitForPort(5173);

const { url } = await sandbox.exposePort(5173, { hostname });

const source = await sandbox.readFile("src/App.tsx");
const modified = await generateCode(prompt, source);
await sandbox.writeFile("src/App.tsx", modified);`;

function SDKRevealSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-3xl flex-col gap-8">
                <p className="font-mono text-sm text-(--slide-fg-muted) opacity-40">
                    $ sandbox "make the goose follow my cursor"
                </p>

                <CodeBlock title="sandbox.ts">{sdkCode}</CodeBlock>
            </div>
        </Slide>
    );
}

SDKRevealSlide.notes = `That command from the opening — this is what's underneath it. Eight lines. Everything we've been talking about is behind these calls.`;

export default SDKRevealSlide;
