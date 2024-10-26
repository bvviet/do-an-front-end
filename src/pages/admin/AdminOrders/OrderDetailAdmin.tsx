import { setLoading } from "@/redux/slices/loadingSlice";
import { useGetDetailOrderAdminQuery } from "@/services/productApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetailAdmin = () => {
  const { orderAdminId } = useParams();
  const id = Number(orderAdminId);
  const disPatch = useDispatch();

  const { data, isLoading } = useGetDetailOrderAdminQuery(id);
  useEffect(() => {
    disPatch(setLoading(isLoading));
  }, [isLoading, disPatch]);

  const getOrderStatus = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "processing":
        return "Đã xác nhận";
      case "shipped":
        return "Đang vận chuyển";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
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
              <span>{getOrderStatus(data?.order_status)}</span>
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-gray-200">3</div>
      </div>

      {/*  */}
      <div className="mt-16">
        <h2 className="text-[2rem] font-bold">4. Chi tiết đơn hàng</h2>
        <div>
          <p className="font-semibold">Khách hàng ghi chú: {data?.note}</p>
        </div>
        <table className="mt-4 min-w-full table-auto border-collapse">
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
                <td className="border border-gray-400 p-2">{index}</td>
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
  );
};

export default OrderDetailAdmin;
