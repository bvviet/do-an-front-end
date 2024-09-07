import { FC } from "react";

interface AvatarComponentProps {
    width: string;
    height: string;
    urlImage: string;
}

const AvatarComponent: FC<AvatarComponentProps> = ({ width, height, urlImage }) => {
    return (
        <div
            className={`p-[3px] bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-full flex items-center justify-center`}
        >
            <img
                src={urlImage}
                alt="Profile"
                style={{ width: `${width}px`, height: `${height}px` }}
                className={`rounded-full object-cover`}
            />
        </div>
    );
};

export default AvatarComponent;
