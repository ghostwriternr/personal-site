export function Header() {
    return (
        <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-row items-center">
                <img src="/images/me.png" alt="Avatar" height="60" width="60" />
                <div className="flex flex-col ml-4">
                    <h1
                        className="text-6xl"
                        style={{
                            color: "#47184c",
                            textShadow: "3px 3px 0px #e17150, 6px 6px 0px #fcaf61;",
                        }}
                    >
                        Naresh Ramesh
                    </h1>
                </div>
            </div>
        </div>
    );
}
