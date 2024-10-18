import { useGetCartQuery } from "@/services/authApi";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";

const Cart = () => {
  const { data: carts } = useGetCartQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  return (
    <div className="container mx-auto">
      <div className="mb-[100px] grid grid-cols-12 gap-4 md:gap-8 lg:gap-28">
        <div className="col-span-12 lg:col-span-7">
          <CartLeft />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CartRight totalPrice={carts?.total_price} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
