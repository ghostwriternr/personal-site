interface SlideProps {
    children: React.ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return (
        <div className="flex h-full w-full items-center justify-center p-8 md:p-16">
            {children}
        </div>
    );
}
