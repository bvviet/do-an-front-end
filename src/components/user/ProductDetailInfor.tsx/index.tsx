import Carousel from "./Carousel";
import start from "../../../assets/icons/start.png";
import { FC, useEffect, useState } from "react";
import FormDetail from "./FormDetail";
import Comment from "./Comment";
import Reviews from "./ReviewList";
import SimilarProductDetail from "./SimilarProductDetail";
import AboutProduct from "./AboutProduct";
// import ao1 from "../../../../public/images/ao1.png";
import { useGetDetailProductQuery } from "@/services/productApi";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

interface ProductDetailInfoProps {
  id: number;
}

const ProductDetailInfo: FC<ProductDetailInfoProps> = ({ id }) => {
  const { data: productDetail, isLoading } = useGetDetailProductQuery(id);
  const [image, setImage] = useState<string>(
    productDetail?.img_thumbnail ?? "",
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const price_regular = useFormatCurrency(productDetail?.price_regular ?? 0);
  const price_sale = useFormatCurrency(productDetail?.price_sale ?? 0);
  console.log({ productDetail });

  return (
    <div className="">
      <div>
        <div className="grid grid-cols-1 gap-[60px] lg:grid-cols-2">
          {/* Left */}
          <div className="">
            {/* Image */}
            <div className="mb-[18px] flex h-[300px] w-full items-center justify-center lg:h-[570px]">
              <img
                className="flex h-[100%] w-[100%] rounded-md object-cover"
                src={`${image}`}
                alt=""
              />
            </div>
            {/* Images */}
            <Carousel
              imgs={productDetail?.product_variants}
              SetImage={setImage}
            />
          </div>
          {/* Right */}
          <div className="ml-auto w-full lg:w-[470px]">
            <div>
              <p className="leading-[171.429%] text-[#566363]">
                {productDetail?.category.name}
              </p>
              <div className="flex flex-col gap-[12px]">
                <h3 className="text-[2.4rem] font-bold leading-[141.667%] text-[#131717]">
                  {productDetail?.name}
                </h3>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[1.8rem] leading-[166.667%] text-[#566363]">
                    {price_regular}
                  </span>
                  <span className="text-[1.8rem] font-semibold leading-[166.667%] text-[#F86624]">
                    {price_sale}
                  </span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src={start} alt="" />
                  <span className="text-[1.8rem] leading-[166.667%] text-[#566363]">
                    5.0 (37)
                  </span>
                </div>
              </div>
              {/* Form */}
              <FormDetail productDetail={productDetail} />
            </div>
          </div>
        </div>
        {/* About product */}
        <AboutProduct
          productContent={productDetail?.content}
          userManual={productDetail?.user_manual}
        />
      </div>
      {/* Comment Form */}
      <Comment />
      {/* Comment */}
      <Reviews />
      {/* Similar Product */}
      <SimilarProductDetail />
    </div>
  );
};

export default ProductDetailInfo;
