import Slide from "../../../components/slides/Slide";
import { DataTable } from "../../../components/slides/diagrams";

function UseCaseMapSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-5xl flex-col gap-8">
                <DataTable columns={2}>
                    <DataTable.Header>
                        <span>Latency budget</span>
                        <span>Techniques</span>
                    </DataTable.Header>
                    <DataTable.Row label="Code interpreters">
                        <span>Sub-second</span>
                        <span>Pre-built image + warm pool</span>
                    </DataTable.Row>
                    <DataTable.Row label="Coding agents">
                        <span>2-3s first start, fast resume</span>
                        <span>Pre-built image + snapshots</span>
                    </DataTable.Row>
                    <DataTable.Row label="Vibe coding">
                        <span>2-3s creation, sub-second resume</span>
                        <span>Pre-built images + snapshots + volumes</span>
                    </DataTable.Row>
                    <DataTable.Row label="RL training / evals">
                        <span>Aggregate throughput</span>
                        <span>Pre-built images + warm pools</span>
                    </DataTable.Row>
                    <DataTable.Row label="CI / code review">
                        <span>Predictable &gt; fast</span>
                        <span>Pre-built images + warm pools</span>
                    </DataTable.Row>
                </DataTable>
            </div>
        </Slide>
    );
}

UseCaseMapSlide.notes = `Code interpreters are embedded in chat UIs. The user typed a question, the model generated code, and now you're executing it. If that takes more than a second, it feels like the chat is broken. Warm pools are basically mandatory.

Coding agents are different — the user kicked off a task and is waiting. 2-3 seconds for first start is fine, they expect setup. But when they come back the next day, resume has to be instant. That's where snapshots earn their complexity.

RL training flips the equation entirely. You're spawning thousands of sandboxes in parallel, each running one candidate solution, scoring it, and tearing down. Individual latency doesn't matter — aggregate throughput is everything. You care about how fast you can churn through a batch.

CI just wants the same environment every time. The image is the contract. Rebuilding it on a cron means cold start is predictable, and predictable beats fast when you're debugging a flaky test.`;

export default UseCaseMapSlide;
