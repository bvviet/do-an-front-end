import { setLoading } from "@/redux/slices/loadingSlice";
import {
  useGetDetailOrderAdminQuery,
  useUpdateOrderStatusAdminMutation,
} from "@/services/productApi";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const getOrderStatus = (status: string | undefined) => {
  switch (status) {
    case "pending":
      return {
        label: "Chờ xác nhận",
        className: "bg-yellow-200 text-yellow-800 p-3",
      };
    case "processing":
      return { label: "Đã xác nhận", className: "bg-blue-200 text-blue-800" };
    case "shipping":
      return {
        label: "Đang vận chuyển",
        className: "bg-green-200 text-[#C1D8C3] p-3",
      };
    case "delivered":
      return {
        label: "Đã giao hàng",
        className: "bg-green-200 text-green-800 p-3",
      };
    case "cancelled":
      return { label: "Đã hủy", className: "bg-red-200 text-red-800 p-3" };
    default:
      return {
        label: "Không xác định",
        className: "bg-gray-200 text-gray-800 p-3",
      };
  }
};

const OrderDetailAdmin = () => {
  const { orderAdminId } = useParams();

  const id = Number(orderAdminId);
  const disPatch = useDispatch();

  const { data, isLoading, refetch } = useGetDetailOrderAdminQuery(id);
  const [updateStatus, { isLoading: isLoadingUpdateStatus }] =
    useUpdateOrderStatusAdminMutation();

  useEffect(() => {
    disPatch(setLoading(isLoading || isLoadingUpdateStatus));
  }, [isLoading, isLoadingUpdateStatus, disPatch]);

  const [orderStatus, setOrderStatus] = useState(data ? data.order_status : "");
  console.log({ orderStatus });

  const handleChange = async (event: SelectChangeEvent) => {
    const newStatus = event.target.value as string;
    setOrderStatus(newStatus);
    try {
      const response = await updateStatus({
        orderId: id,
        status: newStatus,
      }).unwrap();
      toast.success(response.message);
      refetch();
    } catch (error) {
      console.error("Failed to update order status: ", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      {" "}
      {/* Thêm overflow-x-auto ở đây */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 bg-gray-200">
          <h2 className="text-[2rem] font-bold">1. Thông tin khách hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Tên người mua:</span>{" "}
              <span>{data?.name}</span>
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              <span>{data?.email}</span>
            </div>
            <div>
              <span className="font-semibold">Điện thoại:</span>{" "}
              <span>{data?.address.phone_number}</span>
            </div>
            <div>
              <span className="font-semibold">Địa chỉ:</span>{" "}
              <span>
                {data?.address.detail_address}, {data?.address.ward},{" "}
                {data?.address.district}, {data?.address.city}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-gray-200">
          <h2 className="text-[2rem] font-bold">2. Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Mã đơn hàng:</span>{" "}
              <span>{data?.order_id}</span>
            </div>
            <div>
              <span className="font-semibold">Phương thức:</span>{" "}
              <span>{data?.payment_status}</span>
            </div>
            <div>
              <span className="font-semibold">Ngày mua hàng:</span>{" "}
              <span>{data?.created_at}</span>
            </div>
            <div>
              <span className="font-semibold">Trạng thái:</span>{" "}
              <span
                className={`${getOrderStatus(data?.order_status).className} rounded px-2 py-1`}
              >
                {getOrderStatus(data?.order_status).label}
              </span>
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Trạng thái
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={orderStatus}
                  label="orderStatus"
                  onChange={handleChange}
                >
                  <MenuItem value={"pending"}>Chờ xác nhận</MenuItem>
                  <MenuItem value={"processing"}>Đang xử lý</MenuItem>
                  <MenuItem value={"shipping"}>Đang vận chuyển</MenuItem>
                  <MenuItem value={"delivered"}>Đã giao hàng</MenuItem>
                  <MenuItem value={"cancelled"}>Đã hủy</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="col-span-1 bg-gray-200">
          <h2 className="text-[2rem] font-bold">3. Thông tin giao hàng</h2>
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-semibold">Người giao:</span>{" "}
              <span>ABC</span>
            </div>
            <div>
              <span className="font-semibold">Hình thức:</span> <span>ABC</span>
            </div>
          </div>
        </div>
      </div>
      {/* Khối chi tiết đơn hàng */}
      <div className="mt-16 overflow-hidden">
        <h2 className="text-[2rem] font-bold">4. Chi tiết đơn hàng</h2>
        <div>
          <p className="font-semibold">Khách hàng ghi chú: {data?.note}</p>
        </div>
        {/* Bọc bảng trong một container có overflow-x-auto */}
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full max-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 p-2 text-left">#</th>
                <th className="border border-gray-400 p-2 text-left">Ảnh</th>
                <th className="border border-gray-400 p-2 text-left">
                  Tên sản phẩm
                </th>
                <th className="border border-gray-400 p-2 text-center">Giá</th>
                <th className="border border-gray-400 p-2 text-center">
                  Số lượng
                </th>
                <th className="border border-gray-400 p-2 text-center">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.order_items.map((item, index) => (
                <tr className="bg-white" key={item.order_id}>
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">
                    <img
                      src={item.product.img_thumbnail}
                      alt="Sản phẩm 1"
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-400 p-2">
                    {item.product.name}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {item.price}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    {(Number(item.price) || 0) * (Number(item.quantity) || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td
                  colSpan={4}
                  className="border border-gray-400 p-2 text-right font-bold"
                >
                  Tổng tiền:
                </td>
                <td className="border border-gray-400 p-2 text-center font-bold">
                  {data?.total_all_orders}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdmin;
