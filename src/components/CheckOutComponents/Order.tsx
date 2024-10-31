import ThanhToan from "./ThanhToan";
import ItemOrder from "./ItemOrder";
import { useGetCartQuery } from "@/services/authApi";
import { CircularProgress } from "@mui/material";
import { formatCurrency } from "@/utils/formatCurrency";

export default function Order() {
  const { data: carts, isLoading, error } = useGetCartQuery();


  const subtotal = carts?.total_price ?? 0; // Giá tạm tính
  const total = subtotal + 0; // Tổng tiền
  // Kiểm tra nếu đang loading hoặc có lỗi
  if (isLoading) return <div className="flex items-center justify-center"><CircularProgress /></div>;
  if (error) return <div className="text-red-500">Lỗi khi lấy dữ liệu giỏ hàng</div>;
  return (
    <>
      <div className="">
        <div className="max-lg:hidden">
          <ItemOrder />
        </div>
        {/* Tính tiền */}
        <div className="flex justify-between text-[#566363]  bg-white border-t border-b border-solid border-gray-300 p-6">
          <div className="text-[16px] font-manrope font-medium leading-[171.429%]">
            <p>Tổng tiền hàng</p>
            <p>Phí vận chuyển</p>
          </div>
          <div className="text-end text-[16px] font-manrope font-medium leading-[171.429%]">
            <p>{formatCurrency(carts?.total_price ?? 0)}</p>
            <p>Miễn phí</p>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className=" bg-white  border-b border-solid border-gray-300 p-6 rounded-b-md">
          <div className="flex justify-between text-red-600 text-[20px] font-manrope font-bold leading-[171.429%] ">
            <p className="">Tổng tiền</p>
            <p className="">{formatCurrency(total)}</p>
          </div>
          <ThanhToan />

        </div>
      </div>
    </>
  );
}
