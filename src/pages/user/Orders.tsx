// import { Box, Button, Tab } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useGetOrdersUserQuery } from "@/services/productApi";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { setLoading } from "@/redux/slices/loadingSlice";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";

const status = [
  {
    id: "all",
    label: "Tất cả",
  },
  {
    id: "pending",
    label: "Chờ xác nhận",
  },
  {
    id: "shipping",
    label: "Đang vận chuyển",
  },
  {
    id: "done",
    label: "Đã hoàn thành",
  },
  {
    id: "cancelled",
    label: "Đã hủy",
  },
];

const Orders = () => {
  // const [value, setValue] = useState("all");

  // const dispatch = useDispatch();
  // const { data, isLoading } = useGetOrdersUserQuery(value, {
  //   refetchOnMountOrArgChange: true,
  // });

  // useEffect(() => {
  //   dispatch(setLoading(isLoading));
  // }, [dispatch, isLoading]);

  // const getOrderStatus = (status: string | undefined) => {
  //   switch (status) {
  //     case "pending":
  //       return {
  //         label: "Chờ xác nhận",
  //         className: "text-[#BEADFA]",
  //       };
  //     case "processing":
  //       return { label: "Đã xác nhận", className: "bg-blue-200 text-blue-800" };
  //     case "shipping":
  //       return {
  //         label: "Đang vận chuyển",
  //         className: "text-[#61A3BA]",
  //       };
  //     case "cancelled":
  //       return { label: "Đã hủy", className: "text-red-500" };
  //     default:
  //       return {
  //         label: "Không xác định",
  //         className: "bg-gray-200 text-gray-800 p-3",
  //       };
  //   }
  // };

  // const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <div className="container">
      {/* items order 1 */}
      <div className="pb-12">
        <div className="rounded-lg bg-[#ffffff]">
          <div className="py-[12px] px-[24px]">
            <div className="flex items-center justify-end py-6">
              <div className="flex items-center gap-3 text-[#26aa99]">
                <i className="fa-solid fa-truck"></i>
                <p>Giao hàng thành công</p>
              </div>
              <div className="bg-gray-400 w-[1px] h-[20px] mx-3"></div>
              <p className="text-red-600">Hoàn Thành</p>
            </div>
            <div className="bg-gray-400 w-full h-[2px]"></div>
            {/* items sản phẩm 1*/}
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6">
                <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                <div className="flex-1 max-w-[702px]">
                  <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                  <p className="text-gray-500">Phụ kiện</p>
                  <p>x1</p>

                  <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                    Hoàn trả hàng miễn phí 15 ngày
                  </button>
                </div>
              </div>

              <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                <span className="text-gray-400 line-through">₫39.000</span>
                <span className="text-red-600 font-bold">₫28.900</span>
              </div>
            </div>
            <div className="bg-gray-400 w-full h-[1px]"></div>
            {/* items sản phẩm 2*/}
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6">
                <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                <div className="flex-1 max-w-[702px]">
                  <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                  <p className="text-gray-500">Phụ kiện</p>
                  <p>x1</p>

                  <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                    Hoàn trả hàng miễn phí 15 ngày
                  </button>
                </div>
              </div>

              <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                <span className="text-gray-400 line-through">₫39.000</span>
                <span className="text-red-600 font-bold">₫28.900</span>
              </div>
            </div>
          </div>
        </div>
        {/* Thành tiền */}
        <div className="bg-[#fffefb] border border-solid border-gray-200 rounded-lg px-[24px] py-[24px]">
          <div className="gap-2 flex items-center justify-end py-8">
            <p className="font-medium">Thành tiền:</p>
            <span className="text-red-600 font-bold text-[22px]">₫28.900</span>
          </div>
          <div className="flex items-center justify-end gap-4">
            <a
              className="inline-block rounded border  border-solid bg-red-600 px-14 py-4 text-[14px] font-medium text-white hover:bg-transparent hover:bg-red-800 focus:outline-none focus:ring "
              href="#"
            >
              Đánh giá
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Yêu Cầu Trả Hàng / Hoàn Tiền
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Mua lại
            </a>
          </div>
        </div>
      </div>
      {/* items order 2 */}
      <div className="pb-12">
        <div className="rounded-lg bg-[#ffffff]">
          <div className="py-[12px] px-[24px]">
            <div className="flex items-center justify-end py-6">
              <div className="flex items-center gap-3 text-[#26aa99]">
                <i className="fa-solid fa-truck"></i>
                <p>Đơn vị vận chuyển đã nhận hàng</p>
              </div>
              <div className="bg-gray-400 w-[1px] h-[20px] mx-3"></div>
              <p className="text-red-600">Chờ giao hàng</p>
            </div>
            <div className="bg-gray-400 w-full h-[2px]"></div>
            {/* items sản phẩm 1*/}
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6">
                <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                <div className="flex-1 max-w-[702px]">
                  <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                  <p className="text-gray-500">Phụ kiện</p>
                  <p>x1</p>

                  <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                    Hoàn trả hàng miễn phí 15 ngày
                  </button>
                </div>
              </div>

              <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                <span className="text-gray-400 line-through">₫39.000</span>
                <span className="text-red-600 font-bold">₫28.900</span>
              </div>
            </div>
          </div>
        </div>
        {/* Thành tiền */}
        <div className="bg-[#fffefb] border border-solid border-gray-200 rounded-lg px-[24px] py-[24px]">
          <div className="gap-2 flex items-center justify-end py-8">
            <p className="font-medium">Thành tiền:</p>
            <span className="text-red-600 font-bold text-[22px]">₫28.900</span>
          </div>
          <div className="flex items-center justify-end gap-4">
            <a
              className="inline-block rounded border  border-solid bg-red-600 px-14 py-4 text-[14px] font-medium text-white hover:bg-transparent hover:bg-red-800 focus:outline-none focus:ring "
              href="#"
            >
              Đánh giá
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Yêu Cầu Trả Hàng / Hoàn Tiền
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Mua lại
            </a>
          </div>
        </div>
      </div>
      {/* items order 3 */}
      <div className="pb-12">
        <div className="rounded-lg bg-[#ffffff]">
          <div className="py-[12px] px-[24px]">
            <div className="flex items-center justify-end py-6">
              <div className="flex items-center gap-3 text-[#26aa99]">
                <i className="fa-solid fa-truck"></i>
                <p>Đơn hàng đang giao đến bạn</p>
              </div>
              <div className="bg-gray-400 w-[1px] h-[20px] mx-3"></div>
              <p className="text-red-600">Đang giao</p>
            </div>
            <div className="bg-gray-400 w-full h-[2px]"></div>
            {/* items sản phẩm 1*/}
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6">
                <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                <div className="flex-1 max-w-[702px]">
                  <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                  <p className="text-gray-500">Phụ kiện</p>
                  <p>x1</p>

                  <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                    Hoàn trả hàng miễn phí 15 ngày
                  </button>
                </div>
              </div>

              <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                <span className="text-gray-400 line-through">₫39.000</span>
                <span className="text-red-600 font-bold">₫28.900</span>
              </div>
            </div>
          </div>
        </div>
        {/* Thành tiền */}
        <div className="bg-[#fffefb] border border-solid border-gray-200 rounded-lg px-[24px] py-[24px]">
          <div className="gap-2 flex items-center justify-end py-8">
            <p className="font-medium">Thành tiền:</p>
            <span className="text-red-600 font-bold text-[22px]">₫28.900</span>
          </div>
          <div className="flex items-center justify-end gap-4">
            <a
              className="inline-block rounded border  border-solid bg-red-600 px-14 py-4 text-[14px] font-medium text-white hover:bg-transparent hover:bg-red-800 focus:outline-none focus:ring "
              href="#"
            >
              Đánh giá
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Yêu Cầu Trả Hàng / Hoàn Tiền
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Mua lại
            </a>
          </div>
        </div>
      </div>
      {/* items order 4*/}
      <div className="pb-12">
        <div className="rounded-lg bg-[#ffffff]">
          <div className="py-[12px] px-[24px]">
            <div className="flex items-center justify-end py-6">

              <p className="text-red-600">Đã Huỷ</p>
            </div>
            <div className="bg-gray-400 w-full h-[2px]"></div>
            {/* items sản phẩm 1*/}
            <div className="flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-6">
                <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/464675707_1098176495005594_4245022722692694157_n.jpg?stp=dst-jpg_p526x296&_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_ohc=73wlivyRWwgQ7kNvgFFvPDE&_nc_zt=23&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AgsVz-mSGOR5J_1ZRXJjcjd&oh=00_AYDLm5uUaBrQ7xrb8U0NVS2wkTSuUAz7CKGOMKcuJ0WtpA&oe=67260D9E" alt="" className="w-[82px]" />

                <div className="flex-1 max-w-[702px]">
                  <p>Ốp iPhone Pikachu siêu trong suốt: mặt lưng nhựa cứng chống ố, viền silicon chống sốc, chống va đập - Pikapi phụ kiện</p>
                  <p className="text-gray-500">Phụ kiện</p>
                  <p>x1</p>

                  <button className="inline-block rounded border border-solid border-[#26aa99] px-4 text-[12px] font-medium text-[#26aa99] hover:bg-[#26aa99] hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
                    Hoàn trả hàng miễn phí 15 ngày
                  </button>
                </div>
              </div>

              <div className="flex flex-cols-2 gap-4 items-end space-y-1">
                <span className="text-gray-400 line-through">₫39.000</span>
                <span className="text-red-600 font-bold">₫28.900</span>
              </div>
            </div>
          </div>
        </div>
        {/* Thành tiền */}
        <div className="bg-[#fffefb] border border-solid border-gray-200 rounded-lg px-[24px] py-[24px]">
          <div className="gap-2 flex items-center justify-end py-8">
            <p className="font-medium">Thành tiền:</p>
            <span className="text-red-600 font-bold text-[22px]">₫28.900</span>
          </div>
          <div className="flex items-center justify-end gap-4">
            <a
              className="inline-block rounded border  border-solid bg-red-600 px-14 py-4 text-[14px] font-medium text-white hover:bg-transparent hover:bg-red-800 focus:outline-none focus:ring "
              href="#"
            >
              Đánh giá
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Yêu Cầu Trả Hàng / Hoàn Tiền
            </a>
            <a
              className="inline-block rounded border  border-solid border-[#555] px-14 py-4 text-[14px] text-[#555] font-medium hover:bg-gray-200 focus:outline-none focus:ring "
              href="#"
            >
              Mua lại
            </a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Orders;
