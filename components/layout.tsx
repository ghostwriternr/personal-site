import Link from "next/link";

export function Layout(props) {
    return (
        <>
            <div className="h-2 w-screen" style={{ background: "#ffd081" }} />
            <div className="p-4">
                <Link href="/">
                    <img className="fixed hidden md:block" src="/images/me.png" alt="Avatar" height="60" width="60" />
                </Link>
                <div className="grid grid-cols-12 mt-4 mb-4 md:mt-8 md:mb-4">
                    <div className="col-span-12 md:col-start-3 md:col-span-8">{props.children}</div>
                </div>
            </div>
        </>
    );
}
