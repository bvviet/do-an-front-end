import { FC } from "react";

interface AvatarComponentProps {
  width: string;
  height: string;
  urlImage: string;
}

const AvatarComponent: FC<AvatarComponentProps> = ({
  width,
  height,
  urlImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s",
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-[3px]`}
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
