import Slide from "../../../components/slides/Slide";

function NetworkingAddressingSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-10">
                <p className="font-mono text-lg text-(--slide-fg-muted)">
                    https://5173-lg6przaj-lg6przaj.goose-pond-editor.ghostwriternr.me
                </p>
                <p className="font-lufga text-center text-5xl leading-tight font-light">
                    That URL has to find one sandbox, on one machine, in one of
                    330 cities.
                </p>
            </div>
        </Slide>
    );
}

NetworkingAddressingSlide.notes = `The agent runs npm start and expects localhost:3000. But there is no localhost. The environment is running somewhere else entirely.

You have thousands of ephemeral sandboxes — no static IPs, no DNS records. A request from the internet needs to find the right one. That's an addressing problem unique to this kind of infrastructure.`;

export default NetworkingAddressingSlide;
