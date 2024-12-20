/* eslint-disable @typescript-eslint/no-unused-vars */
import Carousel from "./Carousel";
import star from "../../../assets/icons/start.png";
import React, { FC, useEffect, useState } from "react";
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
  id: string;
}

const ProductDetailInfo: FC<ProductDetailInfoProps> = ({ id }) => {

  const { data: productDetail, isLoading } = useGetDetailProductQuery(id);

  const [image, setImage] = useState<string>(
    productDetail?.img_thumbnail ?? "",
  );
  const dispatch = useDispatch();
  console.log(productDetail);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const price_regular = useFormatCurrency(productDetail?.price_regular ?? 0);
  const price_sale = useFormatCurrency(productDetail?.price_sale ?? 0);

  return (
    <div className="">
      <div>
        <div className="grid grid-cols-1 gap-[60px] lg:grid-cols-2">
          {/* Left */}
          <div className="">
            {/* Image */}
            <div className="mb-[18px] flex h-[300px] w-full items-center justify-center rounded-lg border-[1px] border-solid border-[#ccc] lg:h-[570px]">
              <img
                className="flex h-[100%] w-[100%] rounded-md object-cover"
                src={`${productDetail?.img_thumbnail ? productDetail?.img_thumbnail : "https://placehold.co/276x350?text=%22Kh%C3%B4ng%20c%C3%B3%20%E1%BA%A3nh%22"}`}
                alt=""
              />
            </div>
            {/* Images */}
            <Carousel
              imgs={productDetail?.productVariants}
              SetImage={setImage}
            />
          </div>
          {/* Right */}
          <div className="ml-auto w-full lg:w-[470px]">
            <div>
              <p className="leading-[171.429%] text-[#566363]">
                {productDetail?.category_name}
              </p>
              <div className="flex flex-col gap-[12px]">
                <h3 className="font-manrope text-[2.4rem] font-semibold leading-[141.667%] text-[#131717]">
                  {productDetail?.name}
                </h3>
                <div className="flex items-center gap-6">
                  {/* {productDetail?.average_rating && productDetail?.average_rating != 0 ? (
                    <>
                      <img src={star} alt="Star Icon" />
                      <p className="leading-[171.429%] text-[#566363]">
                        {productDetail?.average_rating}
                      </p>
                    </>
                  ) : (
                    ""
                  )} */}
                </div>
                <div className="mb-5 flex items-center gap-[12px] rounded-lg bg-gray-200 p-4">
                  <span className="text-[2.8rem] font-semibold leading-[166.667%] text-red-600">
                    {price_sale}
                  </span>
                  <span className="text-[1.8rem] leading-[166.667%] text-[#929292] line-through">
                    {price_regular}
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
      {productDetail?.id ? (
        <Comment productId={productDetail.id} />
      ) : (
        <p>Loading...</p>
      )}

      {/* Comment */}
      {productDetail?.id ? (
        <Reviews productId={productDetail.id} />
      ) : (
        <p>Loading...</p>
      )}
      {/* Similar Product */}
      <SimilarProductDetail
        relatedProducts={productDetail?.related_products ?? []}
      />
    </div>
  );
};

export default React.memo(ProductDetailInfo);
