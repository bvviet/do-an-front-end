import { FC } from "react";

interface ReviewItemProps {
    numberStarts: string;
    quantityStarts: string;
    percentStart: string; // phần trăm đánh giá (từ 0 đến 100)
}

const ReviewItem: FC<ReviewItemProps> = ({ numberStarts, quantityStarts, percentStart }) => {
    return (
        <div className="flex items-center gap-[16px] lg:gap-[30px]">
            <span className="flex gap-2 text-[1.4rem] lg:text-[1.8rem]">
                <span>{numberStarts}</span> Stars
            </span>
            <div className="relative w-full max-w-[433px] bg-[#C4D1D0] h-[4px]">
                <div className="absolute h-full bg-[#404B4B]" style={{ width: `${percentStart}%` }}></div>
            </div>
            <span className="text-[1.4rem] lg:text-[1.8rem]">{quantityStarts}</span>
        </div>
    );
};
export default ReviewItem;
