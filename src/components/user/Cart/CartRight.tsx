import { FC } from "react";

interface CartRightProps {
  totalPrice?: number;
}

const CartRight: FC<CartRightProps> = ({ totalPrice }) => {
  return (
    <div>
      <h2 className="text-[20px] font-bold lg:text-[16px]">Order Summury</h2>
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      {/*  */}
      <div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Original Price</span>
          <span className="leading-[171.429%]">$582.00</span>
        </div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Savings</span>
          <span className="leading-[171.429%]">$82.00</span>
        </div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Shipping</span>
          <span className="leading-[171.429%]">FREE</span>
        </div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Estimated Sales Tax</span>
          <span className="leading-[171.429%]">$3.50</span>
        </div>
      </div>
      {/*  */}
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      <div className="flex justify-between py-[6px] text-[20px] font-bold">
        <span className="leading-[171.429%]">Savings</span>
        <span className="leading-[171.429%]">{totalPrice}</span>
      </div>

      <button className="mt-[50px] w-full rounded-md bg-[#FFD44D] py-[15px] text-[18px] font-semibold text-[#131717]">
        Proceed to Check Out
      </button>
    </div>
  );
};
export default CartRight;
