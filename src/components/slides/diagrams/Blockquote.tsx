interface BlockquoteProps {
    quote: string;
    person?: {
        name: string;
        title: string;
    };
    source?: string;
    icon?: React.ReactNode;
    compact?: boolean;
    className?: string;
}

export function Blockquote({ quote, person, source, icon, compact, className }: BlockquoteProps) {
    return (
        <div className={`relative flex ${compact ? "max-w-[640px]" : "max-w-[720px]"} flex-col ${compact ? "gap-4" : "gap-6"} ${className ?? ""}`}>
            {icon && (
                <div className={`absolute top-0 ${compact ? "-right-20" : "-right-24"}`}>
                    {icon}
                </div>
            )}
            <div className={`flex ${person ? "-ml-3" : ""}`}>
                {person && (
                    <span className={`font-lufga mr-1 ${compact ? "text-3xl" : "text-5xl"} leading-none font-light`}>
                        &ldquo;
                    </span>
                )}
                <p className={`font-lufga ${compact ? "text-2xl leading-relaxed" : "text-4xl leading-relaxed"} font-light text-balance`}>
                    {quote}
                    {person && <>&rdquo;</>}
                </p>
            </div>
            {(person || source) && (
                <div className={`flex flex-col gap-1 text-(--slide-fg-muted) ${compact ? "text-sm" : ""}`}>
                    {person && (
                        <>
                            <span className="leading-none">{person.name}</span>
                            <span className="leading-none font-medium">{person.title}</span>
                        </>
                    )}
                    {source && (
                        <span className={`mt-1 ${compact ? "text-xs" : "text-sm"} leading-none opacity-60`}>{source}</span>
                    )}
                </div>
            )}
        </div>
    );
}
