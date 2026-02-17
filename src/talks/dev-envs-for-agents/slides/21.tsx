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

UseCaseMapSlide.notes = `Different use cases have different cold start tolerance.

Code interpreters need sub-second — warm pools and pre-built images. Coding agents can tolerate 2-3s first start but need fast resume — snapshots. Vibe coding apps need sub-second resume — snapshots plus volumes. RL training cares about aggregate throughput, not individual latency.

The audience self-identifies with their use case and walks away knowing which primitives matter for them.`;

export default UseCaseMapSlide;
