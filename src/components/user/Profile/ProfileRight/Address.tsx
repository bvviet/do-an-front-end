import { Link } from "react-router-dom";
import addIco from "@/assets/icons/add.svg";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "../../../Confirm";
import {
  useDeleteAddressMutation,
  useGetAddressQuery,
} from "@/services/authApi";
import { toast } from "react-toastify";

const Address = () => {
  const { openPopup } = useModalContext();
  const { data, isLoading, refetch } = useGetAddressQuery(); // Thêm refetch để lấy lại dữ liệu
  const [deleteAddress] = useDeleteAddressMutation();

  // Kiểm tra trạng thái loading và lỗi
  if (isLoading) return <div>Loading...</div>;

  const handleDelete = async (id: number) => {
    try {
      // Gọi deleteAddress và sử dụng unwrap để xử lý kết quả
      await deleteAddress(id).unwrap();
      // Cập nhật lại danh sách địa chỉ
      refetch();

      toast.success("Xóa địa chỉ thành công");
    } catch (error) {
      // Type assertion for error
      const typedError = error as {
        status?: number;
        data?: { message?: string };
      };

      // Create a meaningful error message
      const errorMessage =
        typedError.data?.message ||
        "Failed to delete address. Please try again.";

      // Display the error message
      toast.error(errorMessage);
      console.error("Failed to delete address:", typedError);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <p className="text-[1.9rem] font-bold">Địa chỉ của tôi</p>
        <Link
          to={"/profile/addresses/add"}
          className="flex items-center gap-2 hover:opacity-60"
        >
          <img src={addIco} alt="Add icon" /> <p>Thêm mới</p>
        </Link>
      </div>
      <div className="my-10 h-[1px] w-full bg-slate-300"></div>
      <p className="text-[1.8rem] font-bold">Địa chỉ</p>

      {/* Hiển thị danh sách địa chỉ */}
      {data?.addresses.map((address) => (
        <div key={address.id} className="my-10">
          <div className="flex items-center">
            <div className="flex w-[50%] flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className="font-semibold">
                  {address.address_name || "Địa chỉ không có tên"}
                </p>
                <div className="h-9 w-[1px] bg-slate-600"></div>
                <span>(+84) {address.phone_number}</span>
              </div>
              <div>
                <p>{address.detail_address}</p>
                <span>{address.Ward}</span>, <span>{address.district}</span>,{" "}
                <span>{address.city}</span>
              </div>
              {address.is_default && (
                <p className="w-fit rounded-md border border-solid border-red-500 px-2 text-red-500">
                  Mặc định
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col items-end gap-3">
              <Link
                to={`/profile/addresses/edit/${address.id}`} // Giả sử bạn có một route để chỉnh sửa địa chỉ
                className="text-cyan-500 hover:opacity-60"
              >
                Cập nhật
              </Link>
              <div
                onClick={() =>
                  openPopup(
                    <Confirm
                      handleDelete={() => handleDelete(address.id)} // Sử dụng handleDelete
                    />,
                  )
                }
                className="cursor-pointer text-pink-500 hover:opacity-60"
              >
                Xóa
              </div>
              <div className="w-fit cursor-pointer rounded-md border border-solid border-violet-500 px-2 text-violet-500 hover:opacity-60">
                Thiết lập mặc định
              </div>
            </div>
          </div>
          <div className="my-10 h-[1px] w-full bg-slate-300"></div>
        </div>
      ))}
    </div>
  );
};

export default Address;
