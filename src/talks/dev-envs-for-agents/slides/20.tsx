import Slide from "../../../components/slides/Slide";

const sdkLines = [
    `const sandbox = getSandbox(env.Sandbox, 'demo-session');`,
    ``,
    `await sandbox.files.write('app.js', code);`,
    `await sandbox.commands.run('npm install');`,
    `await sandbox.commands.run('npm start');`,
    `const { url } = await sandbox.exposePort(5173, { hostname });`,
];

export default function SDKRevealSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-3xl flex-col gap-8">
                <p className="font-mono text-sm text-(--slide-fg-muted) opacity-40">
                    $ agent-run --fresh --task "build a tiny web app" --preview
                </p>

                <div className="rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) p-6">
                    <pre className="font-mono text-base leading-relaxed">
                        {sdkLines.map((line, i) => (
                            <div key={i} className="text-(--slide-fg)">
                                {line || "\u00A0"}
                            </div>
                        ))}
                    </pre>
                </div>

                <p className="font-lufga text-center text-lg font-light text-(--slide-fg-muted)">
                    Six lines. That's the entire interface.
                </p>
            </div>
        </Slide>
    );
}
