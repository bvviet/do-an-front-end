import StickerAddFavorite from "./StickerAddFavorite";
import star from "../../../assets/icons/start.png";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import ButtonComponent from "@/components/ButtonComponent";
import { ProductType } from "@/types/product";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import {
  useCreateFavoriteMutation,
  useGetFavoritesQuery,
} from "@/services/productApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { RootState } from "@/redux/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { removeFavorite, setFavorite } from "@/redux/slices/favorites";

interface ProductItemProps {
  bestSeller?: boolean;
  newProduct?: boolean;
  product: ProductType;
  productsHot?: boolean;
}

export interface ErrorType {
  data: {
    message: string;
  };
  status: string;
}

const ProductItem: FC<ProductItemProps> = ({
  bestSeller,
  newProduct,
  product,
  productsHot,
}) => {
  const [showSticker, setShowSticker] = useState<boolean>(false);
  const [isGet, setIsGet] = useState<boolean>(false);
  const favorite = useSelector((state: RootState) => state.favorite);
  const disPatch = useDispatch();
  const truncateString = (str: string, num: number) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  const price_regular = useFormatCurrency(
    product?.price_regular || product?.product_price_regular,
  );
  const price_sale = useFormatCurrency(
    product?.price_sale || product?.product_price_sale,
  );

  const [createFavorite, { isLoading }] = useCreateFavoriteMutation();
  const { refetch, error } = useGetFavoritesQuery(undefined, {
    skip: !isGet,
  });
  if (
    (error as ErrorType)?.data?.message === "Không có sản phẩm yêu thích nào"
  ) {
    disPatch(removeFavorite());
  }

  console.log({ error });
  const handleCreateFavorite = async (productId: number) => {
    setIsGet(true);
    try {
      const response = await createFavorite(productId).unwrap();
      console.log("Thêm yêu thích:", response);

      const refetchedFavorites = await refetch();
      console.log("Dữ liệu sau khi refetch:", refetchedFavorites);

      disPatch(setFavorite(refetchedFavorites?.data?.data));
      // disPatch(removeFavorite());
      toast.success(response.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    disPatch(setLoading(isLoading));
  }, [disPatch, isLoading]);

  return (
    <article className="relative max-w-[370px]">
      {/* Best Seller */}
      {bestSeller && (
        <div className="absolute left-[26px] top-[22px] z-10 w-fit rounded-[5px] bg-black px-[10px] py-[6px] text-[1.4rem] leading-[171.429%] text-white">
          Siêu giảm giá
        </div>
      )}

      {newProduct && (
        <div className="absolute left-[26px] top-[22px] z-10 w-fit rounded-[5px] bg-black px-[10px] py-[6px] text-[1.4rem] leading-[171.429%] text-white">
          Sản phẩm mới
        </div>
      )}

      {productsHot && (
        <div className="absolute left-[26px] top-[22px] z-10 w-fit rounded-[5px] bg-black px-[10px] py-[6px] text-[1.4rem] leading-[171.429%] text-white">
          Sản phẩm hot
        </div>
      )}

      {/* Product Image */}
      <div className="relative">
        <Link to={`/detail/${product?.slug}`} className="">
          <img
            src={product?.img_thumbnail || product.product_image}
            alt=""
            className="h-[310px] w-full transform cursor-pointer rounded-[10px] object-cover transition-all duration-300 ease-in-out hover:scale-105"
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
          <IconButton onClick={() => handleCreateFavorite(product.id)}>
            <FavoriteIcon
              color={
                favorite?.items?.some((item) => item.product_id === product.id)
                  ? "error"
                  : "inherit"
              }
            />
          </IconButton>
        </Tooltip>
      </div>

      {/* Title */}
      <Link to={`/detail/${product?.id}`}>
        <h2 className="transform cursor-pointer text-[20px] min-h-[60px] font-bold text-[#131717] transition-all duration-200 ease-in-out hover:text-[#43766C]">
          {truncateString(product?.name || product?.product_name || "", 60)}
        </h2>
      </Link>

      {/* Price */}
      <div className="mb-[28px] mt-[12px] flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          {product.average_rating && product.average_rating != 0 ? (
            <>
              <img src={star} alt="Star Icon" />
              <p className="leading-[171.429%] text-[#566363]">
                {product.average_rating}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        {product?.price_sale || product?.product_price_sale ? (
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
      <Link to={`/detail/${product.slug}`}>
        <ButtonComponent title="Xem chi tiết" width="100%" onClick={() => {}} />
      </Link>
    </article>
  );
};

export default ProductItem;
