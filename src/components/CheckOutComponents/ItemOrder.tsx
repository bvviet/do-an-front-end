import { useGetCartQuery } from "@/services/authApi"; // Import hàm lấy giỏ hàng từ API
import { formatCurrency } from "@/utils/formatCurrency";
import { CircularProgress } from "@mui/material";

export default function ItemOrder() {
  // Lấy dữ liệu giỏ hàng từ API
  const { data: carts, isLoading, error } = useGetCartQuery();

  // Kiểm tra nếu đang loading hoặc có lỗi
  if (isLoading) return <div className="flex items-center justify-center"><CircularProgress /></div>;
  if (error) return <div className="text-red-500">Lỗi khi lấy dữ liệu giỏ hàng</div>;

  return (
    <>
      <h3 className="text-[2rem] lg:text-[2.8rem] font-medium leading-[145.455%]">
        Đơn hàng ({carts?.cart_items?.length} sản phẩm)
      </h3>
      <div className="border-b border-[#C4D1D0] mt-4 border-solid"></div>
      <div className="mb-8">
        {carts?.cart_items?.map((cart, index) => (
          <div key={index} className="mt-8">
            <div className="flex gap-5">
              {/* Hiển thị ảnh sản phẩm */}
              <img
                src={cart.img_thumbnail} // Lấy ảnh từ API
                alt={cart.name}
                className="w-[80px] h-[80px] border border-solid border-gray-300 rounded-lg p-2"
              />
              <div className="flex justify-between items-center w-full">
                <div className="w-[75%]">
                  {/* Hiển thị tên sản phẩm */}
                  <p className="text-[18px] max-lg:text-[14px] font-manrope font-medium leading-[156.667%]">
                    {cart.name}
                  </p>
                  {/* Hiển thị thông tin khác */}
                  <p className="text-[12px] font-manrope text-[#566363]">
                    {cart.color}
                  </p>
                </div>
                <div className="text-[#566363] max-lg:text-[12px] font-medium">
                  {/* Hiển thị giá và số lượng */}
                  <p>{formatCurrency(cart.total)}</p>
                  <p className="text-end">x{cart.quantity}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
