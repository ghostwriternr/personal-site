import Slide from "../../../components/slides/Slide";

function NetworkingAddressingSlide() {
    return (
        <Slide>
            <div className="flex flex-col items-center gap-10">
                <p className="font-mono text-lg text-(--slide-fg-muted)">
                    https://5173-lg6przaj-lg6przaj.goose-pond-editor.ghostwriternr.me
                </p>
                <p className="font-lufga text-center text-5xl leading-tight font-light">
                    That URL has to find one sandbox, on one machine, anywhere
                    in the world.
                </p>
            </div>
        </Slide>
    );
}

NetworkingAddressingSlide.notes = `Look at that URL. The subdomain encodes two things: the port (5173) and a session token. There's no machine address in there at all.

That's intentional. You can't pre-provision DNS per sandbox — propagation takes tens of seconds. You can't assign a stable IP for the same reason. So when a request comes in, the platform parses the subdomain, extracts the session identity, and does a fast lookup to find which machine that sandbox is currently running on. Then it opens a TCP connection to it.

The identity is stable. The machine location is resolved at request time.`;

export default NetworkingAddressingSlide;
