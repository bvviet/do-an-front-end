import NavbarAdmin from "@/components/admin/Navbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="mx-auto flex w-[1500px] max-sm:w-full">
        <div className="w-1/6 max-sm:hidden">
          <NavbarAdmin />
        </div>
        <div className="content w-5/6  bg-[#E8E9EB] p-7 max-sm:w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
