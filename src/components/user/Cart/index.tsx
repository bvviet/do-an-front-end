import { useGetCartQuery } from "@/services/authApi";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

const Cart = () => {
  const disPatch = useDispatch();

  const { data: carts, isLoading } = useGetCartQuery();
  useEffect(() => {
    disPatch(setLoading(isLoading));
  }, [disPatch, isLoading]);

  return (
    <div className="container mx-auto">
      <div className="mb-[100px] grid grid-cols-12 gap-4 md:gap-8 lg:gap-28">
        <div className="col-span-12 lg:col-span-7">
          <CartLeft />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <CartRight
            totalPrice={carts?.total_price}
            carts={carts?.cart_items || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
