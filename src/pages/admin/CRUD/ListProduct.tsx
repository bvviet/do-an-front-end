import HeaderCrud from "@/components/admin/CRUD/HeaderCrud";
import ListProducts from "@/components/admin/CRUD/List";

export default function ListPrd() {
  return (
    <>
      <div>
        <h1 className="font-manrope text-[36px] font-semibold">
          CRUD Products
        </h1>
        <span className="font-manrope text-[16px] font-medium text-[#9898A3]">
          CRUD Products
        </span>
        <HeaderCrud />
        <ListProducts />
      </div>
    </>
  );
}
