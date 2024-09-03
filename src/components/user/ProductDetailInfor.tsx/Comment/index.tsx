import groupStart from "../../../../assets/icons/start.png";
import FormComment from "./FormComment";
import ReviewItem from "./ReviewItem";

const Comment = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[60px]">
            {/* Left */}
            <div className="">
                <h4 className="font-bold text-[2rem]">Customer Reviews</h4>
                <p className="mt-[9px] lg:mt-[18px] mb-[8px] font-semibold text-[1.8rem] leading-[166.667%]">77 Reviews</p>
                <div className="flex items-center gap-1">
                    <img src={groupStart} alt="" />
                    <img src={groupStart} alt="" />
                    <img src={groupStart} alt="" />
                    <img src={groupStart} alt="" />
                    <img src={groupStart} alt="" />
                </div>
                {/*  */}
                <div className="flex flex-col gap-[12px] mt-[30px]">
                    <ReviewItem numberStarts="5" quantityStarts="37" percentStart="70" />
                    <ReviewItem numberStarts="4" quantityStarts="20" percentStart="60" />
                    <ReviewItem numberStarts="3" quantityStarts="12" percentStart="50" />
                    <ReviewItem numberStarts="2" quantityStarts="8" percentStart="30" />
                    <ReviewItem numberStarts="1" quantityStarts="0" percentStart="0" />
                </div>
            </div>
            {/* Right */}
            <div className="">
                <FormComment />
            </div>
        </div>
    );
};
export default Comment;
