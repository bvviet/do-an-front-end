import React, { FC, useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import { useGetCommentsQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

interface ReviewsProps {
  productId: number;
}

const Reviews: FC<ReviewsProps> = ({ productId }) => {
  const [visibleCount, setVisibleCount] = useState(3);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCommentsQuery({ productId });

  const arr = (data?.comments || []).slice(0, visibleCount);

  // const showHide = visibleCount < data?.comments?.length;

  // const handleShowMore = () => {
  //   if (visibleCount < data?.comments?.length) {
  //     setVisibleCount((prevCount) => prevCount + 6);
  //   } else {
  //     setVisibleCount(3);
  //   }
  // };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className="mt-[70px]">
      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-3">
        {arr.map((comment) => (
          <ReviewItem
            key={comment.id}
            comment={comment}
            productId={productId}
          />
        ))}
      </div>
      <div className="mt-[60px] flex items-center justify-center lg:mt-[75px]">
        {/* <button
          onClick={handleShowMore}
          className="rounded-md bg-[#005D63] px-[35px] py-[15px] text-center"
        >
          {showHide ? "VIEW MORE" : "HIDE"}
        </button> */}
      </div>
    </div>
  );
};
export default React.memo(Reviews);
