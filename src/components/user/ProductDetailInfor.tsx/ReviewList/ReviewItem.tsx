import { Tooltip } from "@mui/material";
import start from "../../../../assets/icons/start.png";
import { Link } from "react-router-dom";

const ReviewItem = () => {
    return (
        <div className="border border-[#C4D1D0] border-solid rounded-md p-[28px]">
            <Link to="/account" className="w-[54px] h-[54px] block">
                <Tooltip title="See personal page" arrow>
                    <img
                        className="w-full h-full rounded-[50%]"
                        src="https://s3-alpha-sig.figma.com/img/2bba/3cd7/c54d80dfcb23e20175dc5def577edb88?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hgaCGJ5PiMFLXHf5MTixVm99wzgUzTWJ7SVUiX1HZcAzDPFJN1x~2drhnXHWXN-z1kAmTOUqpRFGCGwyhMjp4ltJo53o1LPIRIPAoAHrvpv1j7eTulsODt~OkGdR1AjugVi6ePa8HdPYaJnj0IFl1cyDiTjgJtrIwO82ih4oV-Xr6ZITvieS7KBIGJXmJbnbjCPPap4kXE6CeC9Ig0nesxbDzykO86YVsYvPCEJfLRvAu4L0kn82iKfsFPLX3NXKuadENJLP-WsEnTpsU1kZgRpYnhLuKRU9ruIMdc-8cIYMm866IHEQF5Z~vG333Iqnd1goL6TxUm8oK6m51LDKog__"
                        alt=""
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
