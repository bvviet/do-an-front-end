import { IconButton } from "@mui/material";
import QuantitySelector from "./QuantitySelector";
import { Delete, Favorite } from "@mui/icons-material";

const CartLeft = () => {
  return (
    <div>
      <h2 className="mb-12 text-[20px] font-bold">Shopping cart (3 items)</h2>

      <div className="flex flex-col gap-5">
        {/* Item 1 */}
        <div>
          <span>Sản phẩm 1</span>
          {/* Product item with border-top */}
          <section>
            <div className="my-3 h-[1px] w-full bg-[#C4D1D0]"></div>
            <div className="flex items-center gap-7 py-4">
              {/* ảnh */}
              <div className="mb-auto h-[120px] w-[110px] flex-shrink-0 lg:mb-0">
                <img
                  src="https://images.unsplash.com/photo-1728307867610-a0ed88f702dd?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern Green Sweater"
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
              {/* Thông tin */}
              <div className="w-full">
                <div className="flex flex-wrap justify-between">
                  <p className="break-words text-[18px] font-bold">
                    Coffee Beans - Espresso Arabica and Robusta Beans
                  </p>
                  <span className="text-[18px] font-bold">$60</span>
                </div>
                <p className="my-2 text-[#566363]">Cart ID: 12345678910</p>
                <div className="flex flex-wrap items-center justify-between">
                  <QuantitySelector />
                  <div className="flex gap-8">
                    <div className="flex items-center">
                      <IconButton>
                        <Favorite />
                      </IconButton>
                      <p>Lưu</p>
                    </div>

                    <div className="flex items-center">
                      <IconButton>
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
      </div>
    </div>
  );
};

export default CartLeft;
