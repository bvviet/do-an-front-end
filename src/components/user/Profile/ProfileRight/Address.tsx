import { Link } from "react-router-dom";
import addIco from "@/assets/icons/add.svg";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import Confirm from "../../../Confirm";
import {
  useDeleteAddressMutation,
  useGetUsersQuery,
  useSetAddressDefaultMutation,
} from "@/services/authApi";
import { toast } from "react-toastify";
import { useUserInfor } from "@/hooks/useUserInfor";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";

const Address = () => {
  const { openPopup } = useModalContext();
  const dispatch = useDispatch();

  const userInfor = useUserInfor();
  const {
    data: user,
    isLoading: isLoadingAddress,
    refetch,
  } = useGetUsersQuery();

  const [deleteAddress, { isLoading: isLoadingDelete }] =
    useDeleteAddressMutation();

  const [setAddressDefault, { isLoading: isLoadingSetAddressDefault }] =
    useSetAddressDefaultMutation();

  useEffect(() => {
    dispatch(
      setLoading(
        isLoadingAddress || isLoadingDelete || isLoadingSetAddressDefault,
      ),
    );
    if (user) {
      dispatch(saveUserInfo(user));
    }
  }, [
    isLoadingAddress,
    isLoadingDelete,
    isLoadingSetAddressDefault,
    dispatch,
    user,
  ]);

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id).unwrap();
      await refetch();
      toast.success("Xóa địa chỉ thành công");
    } catch (error) {
      const typedError = error as {
        status?: number;
        data?: { message?: string };
      };
      const errorMessage =
        typedError.data?.message || "Xóa địa chỉ thất bại vui lòng thử lại.";
      toast.error(errorMessage);
    }
  };

  const handleSetAddressDefault = async (id: number) => {
    try {
      const response = await setAddressDefault(id).unwrap();
      await refetch();
      toast.success(response.message);
    } catch (error) {
      const typedError = error as {
        status?: number;
        data?: { message?: string };
      };
      const errorMessage =
        typedError.data?.message ||
        "Xét địa chỉ mặc định thất bại vui lòng thử lại.";
      toast.error(errorMessage);
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
      {userInfor?.addresses?.map((address) => (
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
                <span>{address.ward}</span>, <span>{address.district}</span>,
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
                to={`/profile/addresses/update/${address.id}`}
                className="text-cyan-500 hover:opacity-60"
              >
                Cập nhật
              </Link>
              <div
                onClick={() =>
                  openPopup(
                    <Confirm
                      titleButton={"Xóa"}
                      handleDelete={() => handleDelete(address.id)}
                    />,
                  )
                }
                className="cursor-pointer text-pink-500 hover:opacity-60"
              >
                Xóa
              </div>
              <div
                className="w-fit cursor-pointer rounded-md border border-solid border-violet-500 px-2 text-violet-500 hover:opacity-60"
                onClick={() =>
                  openPopup(
                    <Confirm
                      titleButton={"Xác nhận"}
                      handleDelete={() => handleSetAddressDefault(address.id)}
                    />,
                  )
                }
              >
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
