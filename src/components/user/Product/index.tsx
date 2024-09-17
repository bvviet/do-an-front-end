import StickerAddFavorite from "./StickerAddFavorite";
import heartWhite from "../../../assets/icons/heartWhite.svg";
import star from "../../../assets/icons/start.png";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import ButtonComponent from "@/components/ButtonComponent";

interface ProductItemProps {
  bestSeller?: boolean;
  newProduct?: boolean;
}

const ProductItem: FC<ProductItemProps> = ({ bestSeller, newProduct }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSticker, setShowSticker] = useState<boolean>(false);
  const [hoverImg, setHoverImg] = useState<string>(
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );

  const handleMouseEnter = () => {
    setHoverImg(
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  };

  const handleMouseLeave = () => {
    setHoverImg(
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    );
  };

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
        <Link
          to="/detail"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={hoverImg}
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
        <p>Men-Cloths</p>
        <Tooltip title="Thêm vào yêu thích" arrow>
          <button onClick={() => setShowSticker(true)}>
            <img src={heartWhite} alt="Heart Icon" />
          </button>
        </Tooltip>
      </div>

      {/* Title */}
      <h2 className="text-[20px] font-bold text-[#131717]">
        Modern Black T-Shirt
      </h2>

      {/* Price */}
      <div className="mb-[28px] mt-[12px] flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <img src={star} alt="Star Icon" />
          <p className="leading-[171.429%] text-[#566363]">5.0 (132)</p>
        </div>
        <p className="text-[1.8rem] font-semibold leading-[166.667%] text-[#131717]">
          $59
        </p>
      </div>

      {/* Button Add to Cart */}
      {/* <button className="w-full rounded-[5px] border-[1px] border-solid border-[#005D63] from-blue-400 to-teal-700 py-[13px] text-[1.8rem] font-semibold leading-[166.667%] text-[#005D63] transition duration-500 ease-in-out hover:bg-gradient-to-r hover:text-white">
        Add to Cart
      </button> */}
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
