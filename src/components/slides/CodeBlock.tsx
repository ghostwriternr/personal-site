import DotGrid from "./DotGrid";
import PrismHighlighter from "./PrismHighlighter";

const EXTENSION_MAP: Record<string, string> = {
    typescript: "ts",
    javascript: "js",
    tsx: "tsx",
    jsx: "jsx",
    css: "css",
    html: "html",
    json: "json",
    python: "py",
    rust: "rs",
    go: "go",
};

interface CodeBlockProps {
    children: string;
    title?: string;
    language?: string;
    showLineNumbers?: boolean;
    className?: string;
}

export default function CodeBlock({
    children,
    title,
    language = "typescript",
    showLineNumbers = true,
    className = "",
}: CodeBlockProps) {
    const ext = EXTENSION_MAP[language] || language;
    const fileName = title || `index.${ext}`;
    const code = children.trim();

    return (
        <div
            className={`relative flex flex-col overflow-hidden rounded-xl border border-(--slide-border) bg-(--slide-bg-surface) ${className}`}
        >
            <DotGrid id="codeblock-dots" className="opacity-30" />

            <div className="relative z-10 pt-2.5 pb-1.5 pl-3">
                <div className="inline-block rounded-md border border-(--slide-border) bg-(--slide-bg-active) px-2.5 py-1 font-mono text-xs text-(--slide-fg-muted)">
                    {fileName}
                </div>
            </div>

            <div className="relative z-10 overflow-x-auto pb-2">
                <PrismHighlighter
                    code={code}
                    language={language}
                    showLineNumbers={showLineNumbers}
                />
            </div>
        </div>
    );
}
