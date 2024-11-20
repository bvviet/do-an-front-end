import React, { useState } from "react";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const array = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];
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
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-3">
        {arr.map((index) => (
          <ReviewItem key={index} />
        ))}
      </div>
      <div className="mt-[60px] flex items-center justify-center lg:mt-[75px]">
        <button
          onClick={handleShowMore}
          className="rounded-md bg-[#005D63] px-[35px] py-[15px] text-center"
        >
          {showHide ? "VIEW MORE" : "HIDE"}
        </button>
      </div>
    </div>
  );
};
export default React.memo(Reviews);
