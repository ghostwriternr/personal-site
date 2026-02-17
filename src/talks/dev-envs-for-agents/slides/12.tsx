import Slide from "../../../components/slides/Slide";
import { DataTable } from "../../../components/slides/diagrams";

const accent = "text-(--slide-accent-light)";

function IsolationSpectrumSlide() {
    return (
        <Slide>
            <div className="w-full max-w-4xl">
                <DataTable columns={3}>
                    <DataTable.Header>
                        <span>Namespaces only</span>
                        <span className={accent}>MicroVM</span>
                        <span>Full VM</span>
                    </DataTable.Header>
                    <DataTable.Row label="Kernel">
                        <span>Shared</span>
                        <span className={accent}>Own</span>
                        <span>Own</span>
                    </DataTable.Row>
                    <DataTable.Row label="Memory overhead">
                        <span>&lt;1 MB</span>
                        <span className={accent}>~5 MB</span>
                        <span>100 MB+</span>
                    </DataTable.Row>
                    <DataTable.Row label="Startup time">
                        <span>&lt;500ms</span>
                        <span className={accent}>~125ms</span>
                        <span>5-30s</span>
                    </DataTable.Row>
                    <DataTable.Row label="Attack surface">
                        <span>All host syscalls</span>
                        <span className={accent}>5 emulated devices</span>
                        <span>100+ emulated devices</span>
                    </DataTable.Row>
                    <DataTable.Row label="Untrusted code">
                        <span>No</span>
                        <span className={accent}>Yes</span>
                        <span>Yes</span>
                    </DataTable.Row>
                </DataTable>
            </div>
        </Slide>
    );
}

IsolationSpectrumSlide.notes = `You're always running containers. The question is what you put around them.

Namespaces alone — shared kernel, minimal overhead, but every syscall is an attack surface. MicroVMs — own kernel, ~5MB overhead, 125ms startup, only 5 emulated devices. Full VMs — maximum isolation but 100MB+ overhead and 5-30 second startup.

For untrusted code, you need either microVMs or full VMs. The microVM sweet spot is why Firecracker exists.`;

export default IsolationSpectrumSlide;
