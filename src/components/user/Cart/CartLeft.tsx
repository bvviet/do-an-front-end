import { Box, IconButton } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import { Delete, Favorite } from "@mui/icons-material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import Confirm from "@/components/Confirm";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { useDeleteCartMutation } from "@/services/productApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setCart } from "@/redux/slices/CartSlice";
import { useGetCartQuery } from "@/services/authApi";

const CartLeft = () => {
  const { openPopup } = useModalContext();
  const dispatch = useDispatch();
  const [deleteCart, { isLoading }] = useDeleteCartMutation();

  const { data: carts, error, isLoading: ld, refetch } = useGetCartQuery();

  const handleDelete = async (idCart: number) => {
    try {
      await deleteCart(idCart).unwrap();
      refetch();
      toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
    } catch (error) {
      console.log(error);
      toast.error("Loi");
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading || ld));
    if (carts) {
      dispatch(setCart(carts));
    }
  }, [isLoading, dispatch, carts, ld]);

  if (error) {
    console.error("Lỗi khi gọi API:", error);
    return <div>Error: "Đã có lỗi xảy ra"</div>;
  }

  return (
    <div>
      <h2 className="mb-12 text-[22px] font-bold">
        Giỏ hàng ({carts?.cart_items?.length} sản phẩm)
      </h2>

      <div className="flex flex-col gap-5">
        {carts?.cart_items?.map((cart, index) => {
          // Chuyển đổi giá trị price_regular sang số
          //const price = formatCurrency(cart.price_regular);
          const priceSale = formatCurrency(cart.total)
          // const totalPrice = formatCurrency(
          //   (typeof cart.price_regular === "string"
          //     ? parseFloat(cart.price_regular)
          //     : cart.price_regular) * cart.quantity,
          // );

          return (
            <div key={cart.id}>
              <span>Sản phẩm {index + 1}</span>
              <section>
                <div className="my-3 h-[1px] w-full bg-[#C4D1D0]"></div>
                <div className="flex items-center gap-7 py-4">
                  {/* ảnh */}
                  <Link to={`/detail/${cart.product_id}`}>
                    <div className="mb-auto h-[150px] w-[120px] flex-shrink-0 lg:mb-0">
                      <img
                        src={cart.img_thumbnail}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                  </Link>
                  {/* Thông tin */}
                  <div className="w-full">
                    <div className="flex flex-wrap justify-between">
                      <Link to={`/detail/${cart.product_id}`}>
                        <p className="break-words text-[18px] font-bold transition-colors hover:text-[#378d6c]">
                          {cart.name}
                        </p>
                      </Link>
                    </div>
                    <div className="my-3 flex items-center gap-6">
                      <p className="my-2 text-[#566363]">Cart ID: {cart.id}</p>
                      <div>
                        <span className="text-red-600">{formatCurrency(cart.price)}</span>
                        {" "}x{""} {cart.quantity}
                      </div>
                    </div>
                    <div>
                      Tổng Tiền:{" "}
                      <span className="text-red-600">{priceSale}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                      <QuantitySelector
                        quantityNumber={cart.quantity}
                        idCart={cart.id}
                        refetch={refetch}
                      />
                      <div>
                        <p>Màu :
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              backgroundColor: cart.color,
                              borderRadius: '4px',
                              marginRight: 1,
                              display: 'inline-block',
                            }}
                          /></p>
                        <p>Size: {cart.size}</p>
                      </div>
                      <div className="flex gap-8">
                        <div className="flex items-center">
                          <IconButton>
                            <Favorite />
                          </IconButton>
                          <p>Lưu</p>
                        </div>

                        <div className="flex items-center">
                          <IconButton
                            disabled={isLoading}
                            onClick={() =>
                              openPopup(
                                <Confirm
                                  titleButton={"Xóa"}
                                  handleDelete={() => handleDelete(cart.id)}
                                />,
                              )
                            }
                          >
                            <Delete />
                          </IconButton>
                          <p>Xóa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartLeft;
