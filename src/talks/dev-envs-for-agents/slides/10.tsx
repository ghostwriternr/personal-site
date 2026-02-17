import { ChatCircleDots, FileMagnifyingGlass, Package } from "@phosphor-icons/react";
import Slide from "../../../components/slides/Slide";
import { CardGrid } from "../../../components/slides/diagrams";
import { useStep } from "../../../components/slides/useStep";

const ICON_SIZE = 36;

const items = [
    {
        icon: Package,
        title: "You don't know what packages your agent installed.",
    },
    {
        icon: ChatCircleDots,
        title: "You don't know what your user told it to build.",
    },
    {
        icon: FileMagnifyingGlass,
        title: "You don't know what your agent read before it wrote that code.",
    },
];

function IsolationProblemSlide() {
    const step = useStep();

    return (
        <Slide hideGoose edgeToEdge>
            <div className="flex h-full w-full flex-col items-center justify-center gap-10">
                <p className="font-lufga text-3xl font-light">
                    Isolation
                </p>
                <div className="w-full max-w-5xl">
                    <CardGrid columns={3} activeCount={step + 1}>
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="p-8">
                                    <Icon size={ICON_SIZE} weight="thin" />
                                    <h3 className="font-lufga pt-4 text-xl font-medium leading-relaxed">
                                        {item.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </CardGrid>
                </div>
            </div>
        </Slide>
    );
}

IsolationProblemSlide.steps = 3;
IsolationProblemSlide.edgeToEdge = true;

export default IsolationProblemSlide;
