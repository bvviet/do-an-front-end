import NavbarAdmin from "@/components/admin/Navbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className=" w-[1500px] mx-auto flex">
        <div className="w-1/6">
          <NavbarAdmin />
        </div>
        <div className="content w-5/6 bg-[#E8E9EB] p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
