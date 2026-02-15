import Slide from "../../../components/slides/Slide";
import { useStep } from "../../../components/slides/useStep";

const annotations = [
    {
        code: `const sandbox = getSandbox(env.Sandbox, 'demo-session');`,
        label: "A fresh Linux environment, completely isolated",
    },
    {
        code: `await sandbox.files.write('app.js', code);`,
        label: "Files written to a filesystem only this environment can see",
    },
    {
        code: `await sandbox.commands.run('npm install');`,
        label: "Commands ran in a real bash session",
    },
    {
        code: `const { url } = await sandbox.exposePort(5173, { hostname });`,
        label: "Routed from the internet — there's no localhost here",
    },
];

function AnnotatedCodeSlide() {
    const step = useStep();

    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-4">
                {annotations.map((a, i) => {
                    const active = i === step;
                    const visible = i <= step;

                    return (
                        <div
                            key={i}
                            className="flex items-center gap-6 transition-all duration-300"
                            style={{
                                opacity: visible ? (active ? 1 : 0.4) : 0,
                                transform: visible
                                    ? "translateX(0)"
                                    : "translateX(-12px)",
                            }}
                        >
                            <code className="shrink-0 font-mono text-sm text-(--slide-fg)">
                                {a.code}
                            </code>
                            <span
                                className="shrink-0 text-sm transition-opacity duration-300"
                                style={{
                                    color: "var(--slide-accent-light)",
                                    opacity: active ? 1 : 0,
                                }}
                            >
                                ← {a.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Slide>
    );
}

AnnotatedCodeSlide.steps = 4;

export default AnnotatedCodeSlide;
