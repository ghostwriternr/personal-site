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

function UntrustedCodeSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-8">
                <p className="font-lufga text-4xl leading-snug font-light text-balance">
                    Same sandbox capabilities, without the microVM.
                </p>
                <CodeBlock language="javascript">{code}</CodeBlock>
                <p className="font-mono text-base text-(--slide-fg-muted) opacity-60">
                    No containers. No VMs. Lightweight V8-based sandboxes.
                    Milliseconds.
                </p>
            </div>
        </Slide>
    );
}

UntrustedCodeSlide.notes = `Everything we've talked about so far assumes the agent needs a full dev environment — bash, npm, git, a dev server. MicroVMs are the right tool for that.

But there's another class of workload. Your application needs to run a piece of code it didn't write — a plugin, a user script, an LLM-generated function. Maybe thousands of times a second. You can't spin up a VM for each one.

We're building the same sandbox API on top of V8. Same idea — scope what the code can access, limit resources, isolate it. But startup is milliseconds and you can run thousands concurrently on a single machine. The example is an agent-generated migration scoped to one tenant's DB.`;

export default UntrustedCodeSlide;
