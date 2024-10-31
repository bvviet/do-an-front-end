import { useEffect, useState } from "react";
import { useUserInfor } from "@/hooks/useUserInfor";
import './formbill.css'
import { Link } from "react-router-dom";
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


  return (
    <div className="gap-3 h-full rounded-md bg-white p-6">
      <h2 className="flex items-center gap-4 text-red-600 col-span-12 text-[2rem] lg:text-[2.8rem] font-medium leading-[145.455%]">
        <i className="fa-solid fa-location-dot"></i> Địa chỉ nhận hàng
      </h2>
      <div className="font-medium text-[16px] gap-6 flex items-center leading-[145.455%] ">
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

        <Link
          to={"/profile/addresses"}
          className="inline-block text-[16px] hover:underline  font-medium text-indigo-600 "
        >
          Thay đổi
        </Link>
      </div>
    </div>
  );
};

export default FormBill;
