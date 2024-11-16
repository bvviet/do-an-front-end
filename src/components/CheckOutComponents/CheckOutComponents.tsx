import FormBill from "./FormBill";
import ItemOrder from "./ItemOrder";
import ThanhToan from "./ThanhToan";
// import Order from "./Order";

export default function CheckOutComponent() {
  return (
    <>
      <div className="grid-cols-1 gap-20 mt-12">
        <div>
          <div className="lg:hidden ">
            <ItemOrder />
          </div>
          <FormBill />
        </div>
        <ThanhToan />
      </div>
    </>
  );
}
