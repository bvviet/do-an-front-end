import { setCart } from "@/redux/slices/CartSlice";
import { useGetCartQuery } from "@/services/authApi";
import { useCheckoutMutation } from "@/services/productApi";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type RadioValue = "1" | "0" | null;

const ThanhToan: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState<RadioValue>("0");
  const [note, setNote] = useState<string>("");
  const navigate = useNavigate();
  const [checkout] = useCheckoutMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const disPatch = useDispatch();
  const { data: carts, refetch } = useGetCartQuery();

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
        toast.success("Cảm ơn bạn đã mua hàng");
        setTimeout(() => {
          window.location.href = response.payment_url;
        }, 2000);
        refetch();
        disPatch(setCart([])); // Đặt giỏ hàng về trống sau khi thanh toán thành công
        navigate("/thanks");
      } else {
        toast.success("Cảm ơn bạn đã mua hàng");
        refetch();
        disPatch(setCart([])); // Đặt giỏ hàng về trống sau khi thanh toán thành công
        navigate("/thanks");
      }
    } catch (error) {
      toast.error("Thanh toán thất bại");
      console.error("Thanh toán thất bại", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Kiểm tra nếu URL hiện tại chứa chuỗi "http://localhost:5173/payment/success"
    if (
      window.location.href.includes("http://localhost:5173/payment/success")
    ) {
      // Điều hướng đến trang "thank you"
      navigate("/thanks"); // Chỉ dùng đường dẫn tương đối
    }
  }, [navigate]);

  useEffect(() => {
    if (carts && Array.isArray(carts)) {
      // Chỉ cập nhật giỏ hàng nếu carts có dữ liệu hợp lệ
      disPatch(setCart(carts));
    }
  }, [disPatch, carts]);

  return (
    <div className="mt-6">
      <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>
      <div className="mt-6">
        <label className="mx-6 flex items-center gap-5 max-lg:mx-0 max-lg:text-[14px]">
          <input
            type="radio"
            value="1"
            checked={selectedRadio === "1"}
            onChange={() => handleRadioChange("1")}
          />
          <div className="my-2 flex h-[60px] w-full items-center justify-between">
            <p>Thanh toán trực tuyến an toàn bằng cổng thanh toán VNPAY</p>
            <img
              className="object-contain max-lg:h-[28px] max-lg:w-[52px]"
              src="https://bizweb.dktcdn.net/assets/themes_support/vnpay_icon.png"
              alt="VNPAY"
            />
          </div>
        </label>
      </div>

      <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>
      <div className="my-6">
        <label className="mx-6 flex gap-5 max-lg:mx-0 max-lg:text-[14px]">
          <input
            type="radio"
            value="0"
            checked={selectedRadio === "0"}
            onChange={() => handleRadioChange("0")}
          />
          <div className="my-2 flex w-full items-center justify-between">
            <p>Ship COD</p>
            <img
              className="h-auto w-[50px] object-contain max-lg:h-auto max-lg:w-[40px]"
              src="https://png.pngtree.com/png-clipart/20231011/ourmid/pngtree-green-dollar-money-cartoon-png-image_10208428.png"
              alt="COD"
            />
          </div>
        </label>
      </div>

      <div className="mb-6 border-b border-solid border-[#C4D1D0]"></div>
      <div className="col-span-12 mt-[10px] lg:w-auto">
        <label
          htmlFor="note"
          className="text-[1.8rem] font-medium max-lg:text-[14px] lg:text-[1.8rem]"
        >
          Ghi chú
        </label>
        <div>
          <textarea
            id="note"
            className="mt-3 flex w-full items-center rounded-xl border border-solid border-[#d2d1d6] bg-white px-[12px] max-lg:text-[14px]"
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
          className="flex items-center gap-2 text-[16px] text-[#566363] hover:text-black max-lg:text-[14px]"
        >
          <i className="fa-solid fa-chevron-left"></i>
          <p>Quay lại giỏ hàng</p>
        </Link>
        <button
          onClick={handleCheckout}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#FFD44D] px-12 py-4 font-manrope text-[18px] leading-[166.667%] text-black max-lg:text-[14px]"
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
