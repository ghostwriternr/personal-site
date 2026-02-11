import Slide from "../../../components/slides/Slide";

export default function ContentSlide() {
    return (
        <Slide>
            <div className="max-w-2xl">
                <h2 className="font-but-head mb-6 text-4xl text-(--slide-fg)">
                    How It Works
                </h2>
                <ul className="space-y-4 text-lg text-(--slide-fg-muted)">
                    <li>Each slide is a full React component.</li>
                    <li>Use arrow keys to navigate between slides.</li>
                    <li>Press F to toggle fullscreen.</li>
                    <li>The URL hash tracks the current slide.</li>
                </ul>
            </div>
        </Slide>
    );
}
