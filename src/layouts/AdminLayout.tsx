import NavbarAdmin from "@/components/admin/Navbar";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div className="container flex">
        <div className="w-1/4">
          <NavbarAdmin />
        </div>
        <div className="content w-3/4 bg-white p-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
