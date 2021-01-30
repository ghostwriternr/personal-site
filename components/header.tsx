export function Header() {
    return (
        <div className="flex items-center justify-center md:justify-start">
            <img className="hidden md:block md:mr-4" src="/images/me.png" alt="Avatar" height="60" width="60" />
            <h1
                className="text-4xl md:text-6xl"
                style={{
                    color: "#47184c",
                    textShadow: "3px 3px 0px #e17150, 6px 6px 0px #fcaf61;",
                }}
            >
                Naresh Ramesh
            </h1>
        </div>
    );
}
