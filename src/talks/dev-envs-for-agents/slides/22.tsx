import Slide from "../../../components/slides/Slide";

function CloudflareTransitionSlide() {
    return (
        <Slide>
            <p className="font-lufga text-center text-4xl leading-tight font-light text-(--slide-fg)">
                Let's look under the hood.
            </p>
        </Slide>
    );
}

CloudflareTransitionSlide.notes = `I've built agents. Now I build the sandbox platform at Cloudflare. Let's walk the four decisions through a concrete implementation.`;

export default CloudflareTransitionSlide;
