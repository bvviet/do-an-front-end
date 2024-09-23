import HeaderCrud from "@/components/admin/CRUD/HeaderCrud";
import { Outlet } from "react-router-dom";
const CrudLayout = () => {
  return (
    <div className="">
        <h1 className="font-manrope text-[36px] font-semibold">
          CRUD Products
        </h1>
        <span className="font-manrope text-[16px] font-medium text-[#9898A3]">
          CRUD Products
        </span>
      <HeaderCrud />
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default CrudLayout;
