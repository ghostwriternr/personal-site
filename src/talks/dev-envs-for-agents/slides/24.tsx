import Slide from "../../../components/slides/Slide";
import CodeBlock from "../../../components/slides/CodeBlock";

const code = `// Agent writes the migration
const migration = \`
  export default async function run(env) {
    await env.DATABASE.exec("ALTER TABLE users ADD COLUMN preferences JSONB");
  }
\`;

// Your app runs it sandboxed
env.SANDBOX.get("migrate-v1", () => ({
  modules: { "migrate.js": migration },
  env: { DATABASE: scopedTenantDB },
}));`;

export default function UntrustedCodeSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-8">
                <p className="font-lufga text-4xl leading-snug font-light text-balance">
                    What if every application could run untrusted code?
                </p>
                <CodeBlock language="javascript">{code}</CodeBlock>
                <p className="font-mono text-sm text-(--slide-fg-muted) opacity-60">
                    No containers. No VMs. V8 isolates. Milliseconds.
                </p>
            </div>
        </Slide>
    );
}
