import { useCheckoutMutation } from "@/services/productApi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


type RadioValue = "1" | "0" | null;

const ThanhToan: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioValue>("0");
  const [note, setNote] = useState<string>("");
  const navigate = useNavigate();
  const [checkout] = useCheckoutMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRadioChange = (value: RadioValue) => {
    setSelectedRadio(value);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const checkoutData = new FormData();
      checkoutData.append("payment_method", selectedRadio ?? "0");
      checkoutData.append("note", note);

      const response = await checkout(checkoutData).unwrap();

      if (selectedRadio === "1" && response.payment_url) {

        toast.success("Cảm ơn bạn đã mua hàng")
        setTimeout(() => {
          window.location.href = response.payment_url;
        }, 2000)
      } else {
        toast.success("Cảm ơn bạn đã mua hàng")
        navigate("/thanks");
      }
    } catch (error) {
      toast.error("Thanh toán thất bại")
      console.error("Thanh toán thất bại", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="border-b border-[#C4D1D0] mb-6 border-solid"></div>
      <div className="mt-6">
        <label className="flex items-center gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="1"
            checked={selectedRadio === "1"}
            onChange={() => handleRadioChange("1")}
          />
          <div className="flex items-center justify-between w-full my-2 h-[60px]">
            <p>Thanh toán trực tuyến an toàn bằng cổng thanh toán VNPAY</p>
            <img
              className="max-lg:w-[52px] max-lg:h-[28px]  object-contain"
              src="https://bizweb.dktcdn.net/assets/themes_support/vnpay_icon.png"
              alt="VNPAY"
            />
          </div>
        </label>
      </div>

      <div className="border-b border-[#C4D1D0] mb-6 border-solid"></div>
      <div className="my-6">
        <label className="flex gap-5 mx-6 max-lg:mx-0">
          <input
            type="radio"
            value="0"
            checked={selectedRadio === "0"}
            onChange={() => handleRadioChange("0")}
          />
          <div className="flex items-center justify-between w-full my-2">
            <p>Ship COD</p>
            <img
              className="h-auto w-[50px] object-contain max-lg:w-[40px] max-lg:h-auto"
              src="https://png.pngtree.com/png-clipart/20231011/ourmid/pngtree-green-dollar-money-cartoon-png-image_10208428.png"
              alt="COD"
            />
          </div>
        </label>
      </div>

      <div className="border-b border-[#C4D1D0] mb-6 border-solid"></div>
      <div className="col-span-12 lg:w-auto mt-[10px]">
        <label
          htmlFor="note"
          className="text-[1.8rem] lg:text-[1.8rem] font-medium"
        >
          Ghi chú
        </label>
        <div>
          <textarea
            id="note"
            className="flex items-center px-[12px] border border-solid border-[#d2d1d6] w-full rounded-xl mt-3 bg-white"
            placeholder="Nói cho tôi điều bạn muốn"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <Link
          to={"#"}
          className=" hover:text-black text-[#566363] text-[16px] flex items-center gap-2"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <p>Quay lại giỏ hàng</p>
        </Link>
        <button
          onClick={handleCheckout}
          className="text-black text-[18px] max-sm:text-[14px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Thanh toán"
          )}
        </button>
      </div>
    </div>
  );
};

export default ThanhToan;
