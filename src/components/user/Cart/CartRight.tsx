import useFormatCurrency from "@/hooks/useFormatCurrency";
import { CartItemType } from "@/types/cart";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartRightProps {
  carts: CartItemType[];
  totalPrice?: number;
}

const CartRight: FC<CartRightProps> = ({ totalPrice = 0, carts }) => {
  const [disable, setDisable] = useState<boolean>(false);
  // Sử dụng custom hook để format giá trị tổng
  const formattedTotalPrice = useFormatCurrency(totalPrice);

  // Tính tổng tiền (totalPrice + shipping)
  const totalAmount = totalPrice;
  const formattedTotalAmount = useFormatCurrency(totalAmount);
  useEffect(() => {
    const allProductsActive = carts.every((product) => product.status !== 0);
    setDisable(allProductsActive);
  }, [carts]);
  console.log({ disable });

  return (
    <div>
      <h2 className="text-[22px] font-bold max-lg:text-[16px]">Tạm tính</h2>
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      {/*  */}
      <div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Tổng tiền hàng</span>
          <span className="font-semibold leading-[171.429%] text-black">
            {formattedTotalPrice}
          </span>
        </div>
        <div className="flex justify-between py-[6px] text-[#566363]">
          <span className="leading-[171.429%]">Phí vận chuyển</span>
          <span className="font-semibold leading-[171.429%] text-black">
            Miễn phí
          </span>
        </div>
      </div>
      {/*  */}
      <div className="mb-6 mt-7 h-[1px] w-full bg-[#C4D1D0]"></div>
      <div className="flex justify-between py-[6px] text-[20px] font-bold">
        <span className="leading-[171.429%] text-red-600">Tổng thanh toán</span>
        <span className="font-semibold leading-[171.429%] text-red-600">
          {formattedTotalAmount}
        </span>
      </div>
      <Link
        to={"/checkout"}
        className={`${disable || carts.length == 0 ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
      >
        <button
          className={`mt-[20px] w-full rounded-md bg-[#FFD44D] py-[10px] text-[18px] font-semibold text-[#131717] hover:text-slate-500`}
        >
          Check Out
        </button>
      </Link>
    </div>
  );
};

export default React.memo(CartRight);
