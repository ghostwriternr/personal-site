import Slide from "../../../components/slides/Slide";
import { CardGrid } from "../../../components/slides/diagrams";
import { decisions } from "./05";

function DecisionsPersistenceSlide() {
    return (
        <Slide hideGoose edgeToEdge>
            <CardGrid
                columns={2}
                rows={2}
                activeCount={4}
                className="h-full w-full"
            >
                {decisions.map((item) => (
                    <div key={item.title} className="flex h-full flex-col">
                        <div
                            className="flex flex-1 items-center justify-center"
                            style={{
                                backgroundColor: "var(--slide-bg-surface)",
                                borderBottom: "1px solid var(--slide-border)",
                                color: "var(--slide-accent)",
                            }}
                        >
                            {item.render}
                        </div>
                        <div className="flex items-center justify-center p-5">
                            <span className="font-lufga text-xl font-medium">
                                {item.title}
                            </span>
                        </div>
                    </div>
                ))}
            </CardGrid>
        </Slide>
    );
}

DecisionsPersistenceSlide.edgeToEdge = true;
DecisionsPersistenceSlide.notes = `Fourth: persistence. The agent built something. The user left. When they come back tomorrow, the work needs to be there — or you need to be explicit that it won't be. And that decision dominates cold start.`;

export default DecisionsPersistenceSlide;
