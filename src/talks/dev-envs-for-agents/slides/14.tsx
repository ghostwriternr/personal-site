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

NetworkingAddressingSlide.notes = `The agent runs npm start and expects localhost:3000. There is no localhost. The environment is one sandbox, on one machine, in one of 330 cities.

No stable IP per sandbox. No pre-provisioned DNS per sandbox. Addressing is mapping an incoming hostname or token to a sandbox identity — fast, and without leaking cross-tenant information. That's the addressing problem.`;

export default NetworkingAddressingSlide;
