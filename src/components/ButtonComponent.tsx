import { FC } from "react";

interface ButtonComponentProps {
    title: string;
    bg: string;
    width: string;
    colorText: string;
}

const ButtonComponent: FC<ButtonComponentProps> = ({ title, bg = "#005D63", width = "470px", colorText = "white" }) => {
    return (
        <div
            className={`w-[${width}] py-[15px] bg-[${bg}] font-semibold text-center text-${colorText} text-[1.8rem] rounded-md cursor-pointer hover:opacity-60 transition-bg duration-500 ease-in-out`}
        >
            {title}
        </div>
    );
};
export default ButtonComponent;
