import Image from "next/image";

export function HeadShot() {
    return (
        <div className="bg-th-theme-accent p-2 hexagon">
            <Image
                layout="responsive"
                height={283}
                width={283}
                src="/images/profile.jpg"
                alt="Profile"
                className="hexagon"
            />
        </div>
    );
}
