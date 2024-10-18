import { FC, useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ButtonComponent from "../../ButtonComponent";
import { ProductDetailType } from "@/types/product";
import { useAddCartMutation } from "@/services/productApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { setCart } from "@/redux/slices/CartSlice";
import { useGetCartQuery } from "@/services/authApi";
interface FormDetailProps {
  productDetail?: ProductDetailType;
}

type VariantsProps = {
  color: string;
  size: string;
};
type uniqueVariantsProps = VariantsProps[];

const FormDetail: FC<FormDetailProps> = ({ productDetail }) => {
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();
  const productId = Number(id);
  const disPatch = useDispatch();

  const { data: carts, refetch } = useGetCartQuery();
  const [addCart, { isLoading }] = useAddCartMutation();

  console.log({ carts });

  const uniqueVariants: uniqueVariantsProps = [];
  productDetail?.product_variants.forEach((product) => {
    const colorName = product.product_color.name;
    const sizeName = product.product_size.name;
    if (
      !uniqueVariants.some(
        (variant) => variant.color === colorName && variant.size === sizeName,
      )
    ) {
      uniqueVariants.push({
        color: colorName,
        size: sizeName,
      });
    }
  });

  const handleAddCart = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await addCart({
        color,
        size,
        quantity,
        product_id: productId,
      });
      console.log({ res });

      if (res?.error?.status === 404) {
        toast.error(res.error.data.error);
      } else {
        toast.success("Thêm vào giỏ hàng thành công");
        refetch();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    disPatch(setLoading(isLoading));
    if (carts) {
      disPatch(setCart(carts));
    }
  }, [isLoading, disPatch, carts]);

  return (
    <div>
      <form action="">
        <div className="flex items-center gap-[14px]">
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Color:
          </label>
          <div className="ml-[14px] flex items-center gap-[12px]">
            {uniqueVariants
              .map((variant) => variant.color) // Lấy danh sách màu duy nhất
              .filter((value, index, self) => self.indexOf(value) === index) // Lọc bỏ trùng lặp
              .map((colorName) => (
                <div
                  key={colorName}
                  onClick={() => {
                    if (color === colorName) {
                      setColor("");
                    } else {
                      setColor(colorName);
                    }
                  }}
                  className={`flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded border-2 border-solid border-[#ccc]`}
                  style={{ backgroundColor: colorName }}
                >
                  {color === colorName && <CheckIcon color="info" />}
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Size:
          </label>
          <div className="ml-[25px] flex items-center gap-[12px]">
            {uniqueVariants
              .map((variant) => variant.size) // Lấy danh sách size duy nhất
              .filter((value, index, self) => self.indexOf(value) === index) // Lọc bỏ trùng lặp
              .map((sizeName) => (
                <div
                  key={sizeName}
                  onClick={() => {
                    if (sizeName === size) {
                      setSize("");
                    } else {
                      setSize(sizeName);
                    }
                  }}
                  className={`${
                    size === sizeName
                      ? "bg-[#005D63] text-white"
                      : "border border-solid border-[#C4D1D0] text-[#566363]"
                  } flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded`}
                >
                  <div
                    className={`${size === sizeName ? "text-white" : "text-[#566363]"}`}
                  >
                    {sizeName}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex items-center gap-[14px]">
          <label
            className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]"
            htmlFor=""
          >
            Qty:
          </label>
          <div className="ml-[30px] flex items-center gap-[12px]">
            <div
              onClick={() =>
                setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
              }
              className="flex h-[24px] w-[24px] cursor-pointer select-none items-center justify-center rounded border border-solid border-[#C4D1D0] bg-[#C4D1D0] text-[#566363]"
            >
              <div className="leading-[171.429%]">-</div>
            </div>

            <div className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center rounded border border-solid border-[#C4D1D0] text-[#566363]">
              <div className="leading-[171.429%]">{quantity}</div>
            </div>

            <div
              onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
              className="flex h-[24px] w-[24px] cursor-pointer select-none items-center justify-center rounded border border-solid border-[#C4D1D0] bg-[#C4D1D0] text-[#566363]"
            >
              <div className="leading-[171.429%]">+</div>
            </div>
          </div>
        </div>
      </form>
      <p className="leading-[ 166.667%] mb-[40px] mt-[25px] text-[1.8rem] text-[#566363]">
        {productDetail?.description}
      </p>
      <div className="flex flex-col gap-[18px]">
        <ButtonComponent
          title="Thêm giỏ hàng"
          width="100%"
          onClick={() => handleAddCart()}
          loading={false}
        />
        <ButtonComponent
          title="Thanh toán"
          width="100%"
          bg="linear-gradient(to right, #edcf0d, #2e83c8)"
          onClick={() => alert("Ok")}
          loading={false}
        />
      </div>
    </div>
  );
};
export default FormDetail;
