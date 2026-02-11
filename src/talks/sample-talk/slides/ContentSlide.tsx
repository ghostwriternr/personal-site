import Slide from "../../../components/slides/Slide";

export default function ContentSlide() {
    return (
        <Slide>
            <div className="max-w-2xl">
                <h2 className="text-heading-xl mb-6 text-[var(--color-primary)]">
                    How It Works
                </h2>
                <ul className="text-body-lg space-y-4">
                    <li>Each slide is a full React component.</li>
                    <li>Use arrow keys to navigate between slides.</li>
                    <li>Press F to toggle fullscreen.</li>
                    <li>The URL hash tracks the current slide.</li>
                </ul>
            </div>
        </Slide>
    );
}
