import Slide from "../../../components/slides/Slide";

const rows = [
    { label: "Kernel", containers: "Shared", microvms: "Own (~125ms boot)", fullvms: "Own (10-30s boot)" },
    { label: "Memory overhead", containers: "<1 MB", microvms: "~5 MB", fullvms: "100 MB+" },
    { label: "Density", containers: "~50/machine", microvms: "~5/machine", fullvms: "1-2/machine" },
    { label: "Attack surface", containers: "Host kernel", microvms: "~50k lines (Rust)", fullvms: "Full hypervisor" },
    { label: "Untrusted code", containers: "❌", microvms: "✅", fullvms: "✅" },
];

export default function IsolationSpectrumSlide() {
    return (
        <Slide>
            <div className="flex w-full max-w-4xl flex-col gap-8">
                <div className="grid grid-cols-4 gap-y-4 gap-x-6">
                    <div />
                    <span className="font-lufga text-xl font-medium text-(--slide-fg-muted)">
                        Containers
                    </span>
                    <span className="font-lufga text-xl font-medium text-(--slide-accent-light)">
                        MicroVMs
                    </span>
                    <span className="font-lufga text-xl font-medium text-(--slide-fg-muted)">
                        Full VMs
                    </span>

                    {rows.map((row) => (
                        <>
                            <span
                                key={`${row.label}-label`}
                                className="text-sm text-(--slide-fg-muted)"
                            >
                                {row.label}
                            </span>
                            <span
                                key={`${row.label}-containers`}
                                className="font-mono text-sm text-(--slide-fg)"
                            >
                                {row.containers}
                            </span>
                            <span
                                key={`${row.label}-microvms`}
                                className="font-mono text-sm text-(--slide-accent-light)"
                            >
                                {row.microvms}
                            </span>
                            <span
                                key={`${row.label}-fullvms`}
                                className="font-mono text-sm text-(--slide-fg)"
                            >
                                {row.fullvms}
                            </span>
                        </>
                    ))}
                </div>
            </div>
        </Slide>
    );
}
