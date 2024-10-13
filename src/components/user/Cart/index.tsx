import CartLeft from "./CartLeft";
import CartRight from "./CartRight";

const Cart = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-[100px] grid grid-cols-12 gap-4 md:gap-8 lg:gap-28">
        <div className="col-span-12 lg:col-span-7">
          <CartLeft />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CartRight />
        </div>
      </div>
    </div>
  );
};

export default Cart;
