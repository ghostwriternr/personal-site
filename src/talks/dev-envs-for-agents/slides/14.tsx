import Slide from "../../../components/slides/Slide";

export default function PersistenceChoiceSlide() {
    return (
        <Slide>
            <p className="font-lufga max-w-3xl text-center text-4xl leading-tight font-light text-(--slide-fg)">
                What persists and what doesn't
                <br />
                is a{" "}
                <span className="text-(--slide-accent-light)">
                    design choice
                </span>
                .
            </p>
        </Slide>
    );
}
