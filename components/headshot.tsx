export function HeadShot() {
    return (
        <div
            style={{
                background: "#ffe69a",
                padding: 10,
                clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);",
            }}
        >
            <img
                src="/images/profile.jpg"
                alt="Profile"
                style={{
                    clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%);",
                }}
            />
        </div>
    );
}
