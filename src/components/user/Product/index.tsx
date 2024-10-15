import StickerAddFavorite from "./StickerAddFavorite";
import heartWhite from "../../../assets/icons/heartWhite.svg";
import star from "../../../assets/icons/start.png";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import ButtonComponent from "@/components/ButtonComponent";
import { ProductType } from "@/types/product";
import useFormatCurrency from "@/hooks/useFormatCurrency";

interface ProductItemProps {
  bestSeller?: boolean;
  newProduct?: boolean;
  product: ProductType;
}

const ProductItem: FC<ProductItemProps> = ({
  bestSeller,
  newProduct,
  product,
}) => {
  console.log({ product });

  const [isLoading, setIsLoading] = useState(false);
  const [showSticker, setShowSticker] = useState<boolean>(false);

  const truncateString = (str: string, num: number) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  const price_regular = useFormatCurrency(product?.price_regular);
  const price_sale = useFormatCurrency(product?.price_sale);

  return (
    <article className="relative max-w-[370px]">
      {/* Best Seller */}
      {bestSeller && (
        <div className="absolute left-[26px] top-[22px] z-10 w-fit rounded-[5px] bg-black px-[10px] py-[6px] text-[1.4rem] leading-[171.429%] text-white">
          Best Seller
        </div>
      )}

      {newProduct && (
        <div className="absolute left-[26px] top-[22px] z-10 w-fit rounded-[5px] bg-black px-[10px] py-[6px] text-[1.4rem] leading-[171.429%] text-white">
          New Product
        </div>
      )}

      {/* Product Image */}
      <div className="relative">
        <Link to={`/detail/${product?.slug}`}>
          <img
            src={product?.img_thumbnail}
            alt=""
            className="h-[310px] w-full rounded-[10px] object-cover"
          />
        </Link>
        {/* StickerAddFavorite positioned at the bottom */}
        {showSticker && (
          <div className="absolute bottom-0 left-0 right-0">
            <StickerAddFavorite
              showSticker={showSticker}
              setShowSticker={setShowSticker}
            />
          </div>
        )}
      </div>

      {/* Category Name */}
      <div className="mb-[4px] mt-[20px] flex items-center justify-between text-[1.4rem] leading-[171.429%] text-[#566363]">
        <p className="max-w-xs truncate">{product?.category?.name}</p>
        <Tooltip title="Thêm vào yêu thích" arrow>
          <button onClick={() => setShowSticker(true)}>
            <img src={heartWhite} alt="Heart Icon" />
          </button>
        </Tooltip>
      </div>

      {/* Title */}
      <h2 className="text-[20px] font-bold text-[#131717]">
        {truncateString(product?.name || "", 60)}
      </h2>

      {/* Price */}
      <div className="mb-[28px] mt-[12px] flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <img src={star} alt="Star Icon" />
          <p className="leading-[171.429%] text-[#566363]">5.0 (132)</p>
        </div>
        {product?.price_sale ? (
          <div className="flex items-center gap-3">
            <p className="text-[1.8rem] leading-[166.667%] text-[#566363] line-through">
              {price_regular}
            </p>
            <p className="text-[1.8rem] font-semibold leading-[166.667%] text-[#F86624]">
              {price_sale}
            </p>
          </div>
        ) : (
          <p className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]">
            {price_regular}
          </p>
        )}
      </div>
      <ButtonComponent
        title="Thêm giỏ hàng"
        width="100%"
        onClick={() => setIsLoading(!isLoading)}
        loading={isLoading}
      />
    </article>
  );
};

export default ProductItem;
