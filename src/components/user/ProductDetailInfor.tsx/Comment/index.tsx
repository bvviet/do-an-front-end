import React, { FC } from "react";
import groupStart from "../../../../assets/icons/start.png";
import FormComment from "./FormComment";
import ReviewItem from "./ReviewItem";
import { useGetCommentsQuery } from "@/services/productApi";

interface CommentProps {
  productId: number;
}

const Comment: FC<CommentProps> = ({ productId }) => {
  const { data, isLoading } = useGetCommentsQuery({ productId });
  console.log({ data });

  return (
    <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-2 lg:gap-[60px]">
      {/* Left */}
      <div className="">
        <h4 className="text-[2rem] font-bold">Đánh giá của khách hàng</h4>
        <p className="mb-[8px] mt-[9px] text-[1.8rem] font-semibold leading-[166.667%] lg:mt-[18px]">
          {data?.countComments}
        </p>
        <div className="flex items-center gap-1">
          <img src={groupStart} alt="" />
          <img src={groupStart} alt="" />
          <img src={groupStart} alt="" />
          <img src={groupStart} alt="" />
          <img src={groupStart} alt="" />
        </div>
        {/*  */}
        <div className="mt-[30px] flex flex-col gap-[12px]">
          {Object.entries(data?.rating || []).map(([, value], index) => (
            <ReviewItem
              numberStarts={String(index)}
              quantityStarts={String(value)}
              percentStart={String(value)}
            />
          ))}
          {/* <ReviewItem numberStarts="4" quantityStarts="20" percentStart="60" />
          <ReviewItem numberStarts="3" quantityStarts="12" percentStart="50" />
          <ReviewItem numberStarts="2" quantityStarts="8" percentStart="30" />
          <ReviewItem numberStarts="1" quantityStarts="0" percentStart="0" /> */}
        </div>
      </div>
      {/* Right */}
      <div className="">
        <FormComment productId={productId} />
      </div>
    </div>
  );
};
export default React.memo(Comment);
