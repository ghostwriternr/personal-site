import { PixelGoose } from "./goose/PixelGoose";

interface SlideProps {
    children: React.ReactNode;
    hideGoose?: boolean;
}

export default function Slide({ children, hideGoose }: SlideProps) {
    return (
        <div className="relative flex h-full w-full items-center justify-center p-16">
            {!hideGoose && <PixelGoose size={40} className="absolute top-8 right-8" />}
            {children}
        </div>
    );
}
