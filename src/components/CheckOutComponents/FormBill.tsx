import './formbill.css'
import CloseIcon from '@mui/icons-material/Close';
import {
  useGetUsersQuery,
  useSetAddressDefaultMutation,
} from "@/services/authApi";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { saveUserInfo } from "@/redux/slices/authSlice";
import { useEffect, useState } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { useUserInfor } from '@/hooks/useUserInfor';
import Confirm from '../Confirm';
import { useNavigate } from 'react-router-dom';
const FormBill = () => {

  const userInfor = useUserInfor();
  const userInfoDefault = userInfor?.addresses.find(add => add.is_default === true);
  console.log("Đây là userDefaut", userInfoDefault);
  console.log("Đây là user", userInfor);

  // Thiết lập thông tin người dùng
  // const [email, setEmail] = useState<string>("");
  // const [name, setName] = useState<string>("");
  // const [phone, setPhone] = useState<string>("");
  // const [detailAddress, setDetailAddress] = useState<string>("")

  // useEffect(() => {
  //   if (userInfor) {
  //     setEmail(userInfor.email || "");
  //     setName(userInfor.name || "");
  //     setPhone(userInfoDefault?.phone_number || ""); // Lấy số điện thoại từ địa chỉ mặc định
  //     setDetailAddress(userInfoDefault?.detail_address || ""); // Lấy số điện thoại từ địa chỉ mặc định

  //   }
  // }, [userInfor, userInfoDefault]);
  // console.log(userInfor);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Hàm để mở và đóng popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const { openPopup } = useModalContext();
  const dispatch = useDispatch();

  const {
    data: user,
    isLoading: isLoadingAddress,
    refetch,
  } = useGetUsersQuery();


  const [setAddressDefault, { isLoading: isLoadingSetAddressDefault }] =
    useSetAddressDefaultMutation();

  useEffect(() => {
    dispatch(
      setLoading(
        isLoadingAddress || isLoadingSetAddressDefault,
      ),
    );
    if (user) {
      dispatch(saveUserInfo(user));
    }
  }, [
    isLoadingAddress,
    isLoadingSetAddressDefault,
    dispatch,
    user,
  ]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (
      !userInfoDefault?.detail_address ||
      !userInfoDefault?.ward ||
      !userInfoDefault?.district ||
      !userInfoDefault?.city
    ) {
      setShowAlert(true);// Đường dẫn đến trang nhập thông tin
    }
  }, [
    userInfoDefault?.detail_address,
    userInfoDefault?.ward,
    userInfoDefault?.district,
    userInfoDefault?.city,
  ]);
  const handleConfirm = () => {
    setShowAlert(false); // Đóng modal
    navigate("/profile/addresses/add");
  };

  const handleSetAddressDefault = async (id: number) => {
    try {
      const response = await setAddressDefault(id).unwrap();
      await refetch();
      togglePopup()
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
    <div className="gap-3 h-full rounded-md bg-white p-6">
      <h2 className="flex items-center gap-4 text-red-600 col-span-12 max-sm:mb-2 text-[2rem] lg:text-[2.8rem] font-medium leading-[145.455%]">
        <i className="fa-solid fa-location-dot "></i> Địa chỉ nhận hàng
      </h2>
      <div className="font-medium text-[16px] gap-6 max-md:grid flex items-center leading-[145.455%] max-lg:text-[14px]  max-sm:leading-[105.455%]">
        <div className="flex items-center gap-2 font-bold">
          <span className="">{userInfor?.name}</span>
          <span>(+84){userInfoDefault?.phone_number}</span>
        </div>
        <div className="address-container">
          <span>{userInfoDefault?.detail_address}</span>
          <span>{userInfoDefault?.ward}</span>
          <span>{userInfoDefault?.district}</span>
          <span>{userInfoDefault?.city}</span>
        </div>
        <span>{userInfoDefault?.is_default && (
          <p className="w-fit rounded-md border border-solid border-red-500 p-2 text-red-500">
            Mặc định
          </p>
        )}</span>

        <button
          onClick={togglePopup}
          className="inline-block text-[16px] hover:underline  font-medium text-indigo-600 "
        >
          Thay đổi
        </button>
      </div>

      {/* Hiển thị popup nếu isPopupOpen là true */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-[700px] max-sm:w-[320px] w-full max-h-[500px] overflow-y-auto">
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <h2 className="text-[20px] font-semibold mb-4">Cập nhật địa chỉ</h2>
            {userInfor?.addresses?.map((address) => (
              <div key={address.id} className="my-10">
                <div className="flex items-center max-sm:text-[12px]">
                  <div className="flex w-[70%] flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold max-sm:text-[16px]">
                        {user?.name || "Địa chỉ không có tên"}
                      </p>
                      <div className="h-9 w-[1px] bg-gray-500"></div>
                      <span className='text-gray-500'>(+84) {address.phone_number}</span>
                    </div>
                    <div>
                      <p className='text-gray-500'>{address.detail_address} </p>
                      <span className='text-gray-500'>{address.ward} </span>, <span className='text-gray-500'>{address.district} </span>,
                      <span className='text-gray-500'> {address.city}</span>
                    </div>
                    {address.is_default && (
                      <p className="w-fit rounded-md border border-solid border-red-500 px-2 text-red-500">
                        Mặc định
                      </p>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col items-end gap-3">
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
                      Thay đổi
                    </div>
                  </div>
                </div>
                <div className="my-10 h-[1px] w-full bg-slate-300"></div>
              </div>
            ))}

          </div>
        </div>
      )}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg  w-[320px] text-center">
            <h2 className="text-[18px] font-bold mb-4">Thông báo</h2>
            <p className="text-[16px] mb-4">
              Bạn cần nhập đầy đủ thông tin trước khi tiếp tục thanh toán!
            </p>
            <button
              onClick={handleConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormBill;
