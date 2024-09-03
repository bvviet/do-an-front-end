import { Rating } from "@mui/material";
import ButtonComponent from "../../../ButtonComponent";

const FormComment = () => {
    return (
        <div className="ml-auto w-full lg:w-[470px]">
            <div className="mb-[5px] lg:mb-[30px]">
                <h4 className="text-[2rem] font-bold leading-[150%]">How would you rate this?</h4>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} size="large" />
            </div>
            <form action="">
                <div className="flex flex-col gap-[12px]">
                    <label htmlFor="headline" className="text-[1.8rem] leading-[166.667%] font-semibold text-[#131717]">
                        Ad a headline
                    </label>
                    <input
                        type="text"
                        id="headline"
                        placeholder="Write a summary of your review"
                        className="w-full border border-solid border-[#C4D1D0] py-[15px] pl-[15px] pr-[20%] rounded-md"
                    />
                </div>
                <div className="flex flex-col gap-[12px] my-[20px] lg:my-[30px]">
                    <label htmlFor="review" className="text-[#131717] text-[1.8rem] leading-[166.667%] font-semibold">
                        Write a review
                    </label>
                    <textarea
                        name=""
                        id="review"
                        placeholder="Tell us what do you think"
                        className="w-full border border-solid border-[#C4D1D0] h-[180px] p-[15px] resize-none rounded-md"
                    ></textarea>
                </div>
                <ButtonComponent title="Submit Review" bg="#005D63" colorText="white" width="127px" />
            </form>
        </div>
    );
};
export default FormComment;
