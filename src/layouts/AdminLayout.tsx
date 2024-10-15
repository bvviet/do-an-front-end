import NavbarAdmin from "@/components/admin/Navbar";
import { RootState } from "@/redux/store";
import { LinearProgress, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
const FixedLinearProgress = styled(LinearProgress)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});
const AdminLayout = () => {
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  return (
    <div className="bg-[#F5F5F5]">
      {loading && <FixedLinearProgress color="secondary" />}
      <div className="mx-auto flex h-screen w-[1500px] max-sm:w-full">
        <div className="w-1/6 max-sm:hidden">
          <NavbarAdmin />
        </div>
        <div className="content h-fit w-5/6 bg-[#E8E9EB] p-7 max-sm:w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
