import { Link } from "react-router-dom";
import ThanhToan from "./ThanhToan";
import ItemOrder from "./ItemOrder";
import { useGetCartQuery } from "@/services/authApi";
import { CircularProgress } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Order() {
  const { data: carts, isLoading, error } = useGetCartQuery();

  const shippingFee = 20000; // 20.000đ
  const subtotal = carts?.total_price ?? 0; // Giá tạm tính
  const total = subtotal + shippingFee; // Tổng tiền
  // Kiểm tra nếu đang loading hoặc có lỗi
  if (isLoading) return <div className="flex items-center justify-center"><CircularProgress /></div>;
  if (error) return <div className="text-red-500">Lỗi khi lấy dữ liệu giỏ hàng</div>;
  return (
    <>
      <div>
        <div className="max-lg:hidden">
          <ItemOrder />
        </div>
        {/* Tính tiền */}
        <div className="border-b border-[#C4D1D0] mt-4 border-solid"></div>
        <div className="flex justify-between text-[#566363] my-6">
          <div className="text-[16px] font-manrope font-medium leading-[171.429%]">
            <p>Tạm tính</p>
            <p>Phí vận chuyển</p>
          </div>
          <div className="text-end text-[16px] font-manrope font-medium leading-[171.429%]">
            <p>{formatCurrency(carts?.total_price ?? 0)}</p>
            <p>{formatCurrency(shippingFee)}</p>
          </div>
        </div>
        <div className="border-b border-[#C4D1D0] mt-4 border-solid"></div>
        {/* Tổng tiền */}
        <div className="mt-6">
          <div className="flex justify-between text-red-600 text-[20px] font-manrope font-bold leading-[171.429%] ">
            <p className="">Tổng tiền</p>
            <p className="">{formatCurrency(total)}</p>
          </div>
          <ThanhToan />
          <div className="mt-6 flex justify-between">
            <Link
              to={"#"}
              className=" hover:text-black text-[#566363] text-[16px] flex items-center gap-2"
            >
              <i className="fa-solid fa-chevron-left"></i>
              <p>Quay lại giỏ hàng</p>
            </Link>
            <button className=" text-black text-[18px] max-sm:text-[14px] leading-[166.667%] font-manrope py-4 px-12 bg-[#FFD44D] rounded-xl">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
