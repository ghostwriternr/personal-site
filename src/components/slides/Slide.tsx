import { PixelGoose } from "./goose/PixelGoose";

interface SlideProps {
    children: React.ReactNode;
    hideGoose?: boolean;
    edgeToEdge?: boolean;
}

export default function Slide({ children, hideGoose, edgeToEdge }: SlideProps) {
    return (
        <div className={`relative flex h-full w-full ${edgeToEdge ? "items-stretch justify-stretch p-4" : "items-center justify-center p-16"}`}>
            {!hideGoose && <PixelGoose size={40} className="absolute top-8 right-8" />}
            {children}
        </div>
    );
}
