import { Highlight, type PrismTheme } from "prism-react-renderer";

const darkTheme: PrismTheme = {
    plain: {
        color: "#c4a0ff",
        backgroundColor: "transparent",
    },
    styles: [
        {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: { color: "#f0e3de40" },
        },
        {
            types: ["punctuation"],
            style: { color: "#f0e3de50" },
        },
        {
            types: ["namespace"],
            style: { opacity: 0.7 },
        },
        {
            types: ["tag", "operator", "number"],
            style: { color: "#ffab70" },
        },
        {
            types: ["property", "function"],
            style: { color: "#c4a0ff" },
        },
        {
            types: ["tag-id", "selector", "atrule-id"],
            style: { color: "#c4a0ff" },
        },
        {
            types: ["attr-name"],
            style: { color: "#79b8ff" },
        },
        {
            types: [
                "boolean",
                "string",
                "entity",
                "url",
                "attr-value",
                "control",
                "directive",
                "unit",
                "statement",
                "regex",
                "atrule",
                "placeholder",
                "variable",
            ],
            style: { color: "#6cb6ff" },
        },
        {
            types: ["keyword", "module", "imports", "exports"],
            style: { color: "#ff6d33" },
        },
        {
            types: ["deleted"],
            style: { textDecorationLine: "line-through" },
        },
        {
            types: ["inserted"],
            style: { textDecorationLine: "underline" },
        },
        {
            types: ["italic"],
            style: { fontStyle: "italic" },
        },
        {
            types: ["important", "bold"],
            style: { fontWeight: "bold" },
        },
        {
            types: ["important"],
            style: { color: "#c4a0ff" },
        },
        {
            types: ["class-name", "builtin", "maybe-class-name"],
            style: { color: "#c4a0ff" },
        },
        {
            types: ["property-access"],
            style: { color: "#79b8ff" },
        },
        {
            types: ["method", "function-variable"],
            style: { color: "#c4a0ff" },
        },
    ],
};

const languageMap: Record<string, string> = {
    ts: "typescript",
    js: "javascript",
    tsx: "tsx",
    jsx: "jsx",
    json: "json",
    bash: "bash",
    sh: "bash",
    shell: "bash",
    css: "css",
    html: "markup",
    xml: "markup",
    md: "markdown",
    yaml: "yaml",
    yml: "yaml",
    py: "python",
    python: "python",
    go: "go",
    rust: "rust",
    sql: "sql",
};

interface PrismHighlighterProps {
    code: string;
    language: string;
    showLineNumbers?: boolean;
}

export default function PrismHighlighter({
    code,
    language,
    showLineNumbers = true,
}: PrismHighlighterProps) {
    const prismLanguage = languageMap[language] || language;
    const lineCount = code.split("\n").length;
    const lineNumberWidth = Math.max(2, String(lineCount).length);

    return (
        <Highlight theme={darkTheme} code={code} language={prismLanguage}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{
                        ...style,
                        margin: 0,
                        padding: "8px 12px",
                        paddingTop: 0,
                        overflow: "auto",
                        fontFamily:
                            "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, monospace",
                        fontSize: "16px",
                        lineHeight: "1.6",
                    }}
                >
                    {tokens.map((line, i) => {
                        const lineProps = getLineProps({ line });
                        return (
                            <div
                                key={`L${i}-${line.length}`}
                                {...lineProps}
                                style={{
                                    ...lineProps.style,
                                    display: "flex",
                                }}
                            >
                                {showLineNumbers && (
                                    <span
                                        style={{
                                            color: "var(--slide-fg-muted)",
                                            opacity: 0.4,
                                            paddingRight: "16px",
                                            userSelect: "none",
                                            textAlign: "right",
                                            minWidth: `${lineNumberWidth + 1}ch`,
                                            display: "inline-block",
                                        }}
                                    >
                                        {String(i + 1).padStart(
                                            lineNumberWidth,
                                            "0",
                                        )}
                                    </span>
                                )}
                                <span style={{ flex: 1 }}>
                                    {line.map((token) => (
                                        <span
                                            key={`${i}-${token.types.join(".")}-${token.content.slice(0, 8)}`}
                                            {...getTokenProps({ token })}
                                        />
                                    ))}
                                </span>
                            </div>
                        );
                    })}
                </pre>
            )}
        </Highlight>
    );
}
