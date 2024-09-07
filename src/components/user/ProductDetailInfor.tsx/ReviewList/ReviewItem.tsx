import { Tooltip } from "@mui/material";
import start from "../../../../assets/icons/start.png";
import { Link } from "react-router-dom";
import AvatarComponent from "../../../Avatar";

const ReviewItem = () => {
    return (
        <div className="border border-[#C4D1D0] border-solid rounded-md p-[28px]">
            <Link to="/account" className="w-[54px] h-[54px] block">
                <Tooltip title="See personal page" arrow>
                    <AvatarComponent
                        width="50"
                        height="50"
                        urlImage="https://plus.unsplash.com/premium_photo-1658527049634-15142565537a?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    />
                </Tooltip>
            </Link>
            <p className="text-[1.8rem] font-semibold leading-[166.667%] mt-[12px]">Sarah Taylor</p>
            <div className="flex items-center gap-1">
                <img src={start} alt="" />
                <img src={start} alt="" />
                <img src={start} alt="" />
                <img src={start} alt="" />
                <img src={start} alt="" />
            </div>
            <div className="mt-[28px]">
                <h4 className="text-[2rem] font-bold mb-[16px]">Beautiful Sweater</h4>
                <p className="text-[#566363] text-[1.6rem] leading-[175%]">
                    “Really a beautiful sweater for women. I am really lucky that I could buy this sweater very easily”
                </p>
            </div>
        </div>
    );
};

export default ReviewItem;
