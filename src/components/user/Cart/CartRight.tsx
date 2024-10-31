import useFormatCurrency from "@/hooks/useFormatCurrency";
import { FC } from "react";
import { Link } from "react-router-dom";

interface CartRightProps {
  totalPrice?: number;
}
const CartRight: FC<CartRightProps> = ({ totalPrice = 0 }) => {


  // Sử dụng custom hook để format giá trị tổng
  const formattedTotalPrice = useFormatCurrency(totalPrice);


  // Tính tổng tiền (totalPrice + shipping)
  const totalAmount = totalPrice;
  const formattedTotalAmount = useFormatCurrency(totalAmount);
  return (
    <div>
      <h2 className="text-[22px] font-bold max-lg:text-[16px]">Tạm tính</h2>
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      {/*  */}
      <div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%] ">Tổng tiền hàng</span>
          <span className="leading-[171.429%] text-black font-semibold">{formattedTotalPrice}</span>
        </div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Phí vận chuyển</span>
          <span className="leading-[171.429%] text-black font-semibold">Miễn phí</span>
        </div>
      </div>
      {/*  */}
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      <div className="flex justify-between py-[6px] text-[20px] font-bold">
        <span className="leading-[171.429%] text-red-600">Tổng thanh toán</span>
        <span className="leading-[171.429%] text-red-600 font-semibold">{formattedTotalAmount}</span>
      </div>

      <button className="mt-[20px] w-full rounded-md bg-[#FFD44D] py-[10px] text-[18px] font-semibold text-[#131717]">
        <Link to={"/checkout"}>Check Out</Link>
      </button>
    </div>
  );
};
export default CartRight;
