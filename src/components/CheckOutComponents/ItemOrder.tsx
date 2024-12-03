import { useGetCartQuery } from "@/services/authApi"; // Import hàm lấy giỏ hàng từ API
import { formatCurrency } from "@/utils/formatCurrency";
import { Box, CircularProgress } from "@mui/material";

export default function ItemOrder() {
  // Lấy dữ liệu giỏ hàng từ API
  const { data: carts, isLoading, error } = useGetCartQuery();

  // Kiểm tra nếu đang loading hoặc có lỗi
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (error)
    return <div className="text-red-500">Lỗi khi lấy dữ liệu giỏ hàng</div>;

  return (
    <>
      <div className="mt-4 rounded-md bg-white p-6">
        <h3 className="text-[2rem] font-medium leading-[145.455%] lg:text-[2.8rem]">
          Đơn hàng ({carts?.cart_items?.length} sản phẩm)
        </h3>
        <div className="mt-4 border-b border-solid border-[#C4D1D0]"></div>

        {/* Div để cuộn */}
        <div className="mb-8 max-h-[300px] overflow-y-auto">
          {carts?.cart_items?.map((cart, index) => (
            <div
              key={index}
              className={`mt-8 ${cart.status !== 0 ? "pointer-events-none cursor-not-allowed !opacity-50" : ""}`}
            >
              <div className="mb-8 flex gap-5">
                {/* Hiển thị ảnh sản phẩm */}
                <img
                  src={
                    cart.status !== 0
                      ? "https://placehold.co/276x350?text=H%E1%BA%BFt%20h%C3%A0ng"
                      : cart.img_thumbnail
                  }
                  alt={cart.name}
                  className="h-[80px] w-[80px] rounded-lg border border-solid border-gray-300 p-2"
                />
                <div className="flex w-full items-center justify-between">
                  <div className="w-[75%] pb-2">
                    {/* Hiển thị tên sản phẩm */}
                    <p className="font-manrope text-[18px] font-medium leading-[156.667%] max-lg:text-[14px]">
                      {cart.name}
                    </p>
                    {/* Hiển thị thông tin khác */}
                    <span className="flex items-center gap-4 font-manrope text-[14px] text-[#566363]">
                      Màu sắc:
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          backgroundColor: cart.color,
                          borderRadius: "4px",
                          marginRight: 1,
                          display: "inline-block",
                        }}
                      />
                    </span>
                  </div>
                  <div className="pr-2 font-medium text-[#566363] max-lg:text-[12px]">
                    {/* Hiển thị giá và số lượng */}
                    <p>{formatCurrency(cart.total)}</p>
                    <p className="text-end">x{cart.quantity}</p>
                  </div>
                </div>
              </div>
              <div className="border-b border-solid border-[#C4D1D0]"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
