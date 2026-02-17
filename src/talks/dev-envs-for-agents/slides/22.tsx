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

CloudflareTransitionSlide.notes = `I want to show you how we thought about these decisions at Cloudflare. Not as a product pitch — as a design walkthrough. One way to approach these four problems.`;

export default CloudflareTransitionSlide;
