import { FC } from "react";

interface AvatarComponentProps {
  width: string;
  height: string;
  urlImage: string | undefined;
}

const AvatarComponent: FC<AvatarComponentProps> = ({
  width,
  height,
  urlImage,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-[3px]`}
    >
      <img
        src={
          urlImage
            ? urlImage
            : "https://placehold.co/276x350?text=%22No%20Image%22"
        }
        alt="Profile"
        style={{ width: `${width}px`, height: `${height}px` }}
        className={`rounded-full object-cover`}
      />
    </div>
  );
};

export default AvatarComponent;
