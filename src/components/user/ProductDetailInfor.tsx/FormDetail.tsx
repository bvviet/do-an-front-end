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
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Color:
          </label>
          <div className="ml-[14px] flex items-center gap-[12px]">
            <div
              onClick={() => setColor("green")}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded bg-[#90A338] text-white"
            >
              {color === "green" && <CheckIcon color="inherit" />}
            </div>
            <div
              onClick={() => setColor("black")}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded bg-[#2A2A2A] text-white"
            >
              {color === "black" && <CheckIcon color="inherit" />}
            </div>
            <div
              onClick={() => setColor("pink")}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded bg-[#EF8195] text-white"
            >
              {color === "pink" && <CheckIcon color="inherit" />}
            </div>
            <div
              onClick={() => setColor("white")}
              className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded border border-solid border-[#C4D1D0] bg-[#FFF] text-black"
            >
              {color === "white" && <CheckIcon color="inherit" />}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Size:
          </label>
          <div className="ml-[25px] flex items-center gap-[12px]">
            <div
              onClick={() => setSize("XL")}
              className={`${
                size === "XL"
                  ? "bg-[#005D63] text-white"
                  : "border border-solid border-[#C4D1D0] text-[#566363]"
              } flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded`}
            >
              <div
                className={`${size === "XL" ? "text-white" : "text-[#566363]"} leading-[171.429%]`}
              >
                XL
              </div>
            </div>
            <div
              onClick={() => setSize("L")}
              className={`${
                size === "L"
                  ? "bg-[#005D63] text-white"
                  : "border border-solid border-[#C4D1D0] text-[#566363]"
              } flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded`}
            >
              <div
                className={`${
                  size === "L" ? "text-white" : "text-[#566363]"
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
              } flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded`}
            >
              <div
                className={`${
                  size === "M" ? "text-white" : "text-[#566363]"
                } leading-[171.429%] text-[#566363]`}
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
              } flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded`}
            >
              <div
                className={`${
                  size === "S" ? "text-white" : "text-[#566363]"
                }text-[#566363] leading-[171.429%]`}
              >
                S
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[14px]">
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Qty:
          </label>
          <div className="ml-[30px] flex items-center gap-[12px]">
            <div
              onClick={() =>
                setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
              }
              className="flex h-[24px] w-[24px] cursor-pointer select-none items-center justify-center rounded border border-solid border-[#C4D1D0] bg-[#C4D1D0] text-[#566363]"
            >
              <div className="leading-[171.429%]">-</div>
            </div>

            <div className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded border border-solid border-[#C4D1D0] text-[#566363]">
              <div className="leading-[171.429%]">{quantity}</div>
            </div>

            <div
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              className="flex h-[24px] w-[24px] cursor-pointer select-none items-center justify-center rounded border border-solid border-[#C4D1D0] bg-[#C4D1D0] text-[#566363]"
            >
              <div className="leading-[171.429%]">+</div>
            </div>
          </div>
        </div>
      </form>
      <p className="leading-[ 166.667%] mb-[40px] mt-[25px] text-[1.8rem] text-[#566363]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam,{" "}
      </p>
      <div className="flex flex-col gap-[18px]">
        <ButtonComponent
          title="Thêm giỏ hàng"
          width="100%"
          onClick={() => alert("Ok")}
          loading={false}
        />
        <ButtonComponent
          title="Thanh toán"
          width="100%"
          bg="linear-gradient(to right, #edcf0d, #2e83c8)"
          onClick={() => alert("Ok")}
          loading={false}
        />
      </div>
    </div>
  );
};
export default FormDetail;
