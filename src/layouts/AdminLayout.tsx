import NavbarAdmin from "@/components/admin/Navbar";
import { RootState } from "@/redux/store";
import { LinearProgress, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const FixedLinearProgress = styled(LinearProgress)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});
const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.userInfo?.role,
  );

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated !== "admin") {
        toast.error("Bạn không phải admin để vào.");
        navigate("/");
      }
      setIsLoading(false);
    };

    if (isLoading) {
      checkAuth();
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="overflow-hidden bg-[#F5F5F5]">
      {/* Thêm overflow-hidden */}
      {loading && <FixedLinearProgress color="secondary" />}
      <div className="mx-auto flex h-screen max-w-[1500px]">
        {/* Đổi width thành max-w */}
        <div className="w-1/6 max-sm:hidden">
          <NavbarAdmin />
        </div>
        <div className="content h-full w-5/6 overflow-y-auto bg-[#E8E9EB] p-7">
          {/* Đặt h-full và overflow-y-auto */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
