import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ButtonComponent from "../../ButtonComponent";

const FormDetail = () => {
    const [color, setColor] = useState<string>("green");
    const [size, setSize] = useState<string>("XL");
    const [quantity, setQuantity] = useState<number>(1);
    return (
        <div>
            <form action="">
                <div className="flex items-center gap-[14px]">
                    <label className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]" htmlFor="">
                        Color:
                    </label>
                    <div className="flex items-center gap-[12px] ml-[14px]">
                        <div
                            onClick={() => setColor("green")}
                            className="bg-[#90A338] rounded flex items-center justify-center w-[24px] h-[24px] text-white cursor-pointer"
                        >
                            {color === "green" && <CheckIcon color="inherit" />}
                        </div>
                        <div
                            onClick={() => setColor("black")}
                            className="bg-[#2A2A2A] rounded flex items-center justify-center w-[24px] h-[24px] text-white cursor-pointer"
                        >
                            {color === "black" && <CheckIcon color="inherit" />}
                        </div>
                        <div
                            onClick={() => setColor("pink")}
                            className="bg-[#EF8195] rounded flex items-center justify-center w-[24px] h-[24px] text-white cursor-pointer"
                        >
                            {color === "pink" && <CheckIcon color="inherit" />}
                        </div>
                        <div
                            onClick={() => setColor("white")}
                            className="bg-[#FFF] border border-solid border-[#C4D1D0] rounded flex items-center justify-center w-[24px] h-[24px] text-black cursor-pointer"
                        >
                            {color === "white" && <CheckIcon color="inherit" />}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[14px]">
                    <label className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]" htmlFor="">
                        Size:
                    </label>
                    <div className="flex items-center gap-[12px] ml-[25px]">
                        <div
                            onClick={() => setSize("XL")}
                            className={`${
                                size === "XL"
                                    ? "bg-[#005D63] text-white"
                                    : "border border-solid border-[#C4D1D0] text-[#566363]"
                            }  rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer`}
                        >
                            <div className={`${size === "XL" ? "text-white" : "text-[#566363] "} leading-[171.429%]`}>
                                XL
                            </div>
                        </div>
                        <div
                            onClick={() => setSize("L")}
                            className={`${
                                size === "L"
                                    ? "bg-[#005D63] text-white"
                                    : "border border-solid border-[#C4D1D0] text-[#566363]"
                            }  rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer`}
                        >
                            <div
                                className={`${
                                    size === "L" ? "text-white" : "text-[#566363] "
                                }text-[#566363] leading-[171.429%]`}
                            >
                                L
                            </div>
                        </div>
                        <div
                            onClick={() => setSize("M")}
                            className={`${
                                size === "M"
                                    ? "bg-[#005D63] text-white"
                                    : "border border-solid border-[#C4D1D0] text-[#566363]"
                            }  rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer`}
                        >
                            <div
                                className={`${
                                    size === "M" ? "text-white" : "text-[#566363] "
                                } text-[#566363] leading-[171.429%]`}
                            >
                                M
                            </div>
                        </div>
                        <div
                            onClick={() => setSize("S")}
                            className={`${
                                size === "S"
                                    ? "bg-[#005D63] text-white"
                                    : "border border-solid border-[#C4D1D0] text-[#566363]"
                            }  rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer`}
                        >
                            <div
                                className={`${
                                    size === "S" ? "text-white" : "text-[#566363] "
                                }text-[#566363] leading-[171.429%]`}
                            >
                                S
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-[14px]">
                    <label className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]" htmlFor="">
                        Qty:
                    </label>
                    <div className="flex items-center gap-[12px] ml-[30px]">
                        <div
                            onClick={() => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))}
                            className="select-none bg-[#C4D1D0] border border-solid border-[#C4D1D0] text-[#566363] rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer"
                        >
                            <div className="leading-[171.429%]">-</div>
                        </div>

                        <div className="border border-solid border-[#C4D1D0] text-[#566363] rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer">
                            <div className="leading-[171.429%]">{quantity}</div>
                        </div>

                        <div
                            onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                            className="select-none bg-[#C4D1D0] border border-solid border-[#C4D1D0] text-[#566363] rounded flex items-center justify-center w-[24px] h-[24px] cursor-pointer"
                        >
                            <div className="leading-[171.429%]">+</div>
                        </div>
                    </div>
                </div>
            </form>
            <p className="mt-[25px] mb-[40px] text-[1.8rem] text-[#566363] leading-[ 166.667%]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam,{" "}
            </p>
            <div className="flex flex-col gap-[18px]">
                <ButtonComponent title="Ad to Cart" bg="#005D63" width="100%" colorText="white" />
                <ButtonComponent title="Check Out" bg="#FFD44D" width="100%" colorText="black" />
            </div>
        </div>
    );
};
export default FormDetail;
