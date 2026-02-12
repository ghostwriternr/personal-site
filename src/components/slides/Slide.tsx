import { PixelGoose } from "./goose/PixelGoose";

interface SlideProps {
    children: React.ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return (
        <div className="relative flex h-full w-full items-center justify-center p-16">
            <PixelGoose size={40} className="absolute top-8 right-8" />
            {children}
        </div>
    );
}
