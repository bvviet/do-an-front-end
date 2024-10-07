import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
// import { useGetUsersQuery } from "@/services/authApi";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { saveUserInfo } from "@/redux/slices/authSlice";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
