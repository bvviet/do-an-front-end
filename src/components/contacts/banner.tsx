interface BannerContactProps {
    title: string;
    subtitle: string;
}

export default function BannerContact({ title, subtitle }: BannerContactProps) {
    return (
        <div className="w-full h-[276px] bg-[#F1DEB4] flex flex-col items-center justify-center">
            <p className="text-center font-slab text-[58px] font-bold max-sm:text-6xl container" style={{ lineHeight: "117.241%" }}>
                {title}
            </p>
            <p className="font-manrope text-[18px] font-normal max-sm:text-[14px] text-center container" style={{ lineHeight: "175%" }}>
                {subtitle}
            </p>
        </div>
    );
}

