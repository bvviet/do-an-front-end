import { useState } from "react";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
    const [visibleCount, setVisibleCount] = useState(3);
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const arr = array.slice(0, visibleCount);

    const showHide = visibleCount < array.length;

    const handleShowMore = () => {
        if (visibleCount < array.length) {
            setVisibleCount((prevCount) => prevCount + 6);
        } else {
            setVisibleCount(3);
        }
    };
    return (
        <div className="mt-[70px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
                {arr.map((index) => (
                    <ReviewItem key={index} />
                ))}
            </div>
            <div className="flex items-center justify-center mt-[60px] lg:mt-[75px]">
                <button onClick={handleShowMore} className="bg-[#005D63] text-center px-[35px] py-[15px] rounded-md">
                    {showHide ? "VIEW MORE" : "HIDE"}
                </button>
            </div>
        </div>
    );
};
export default Reviews;
