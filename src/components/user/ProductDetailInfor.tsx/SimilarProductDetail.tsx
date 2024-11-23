import React from "react";
import ProductItem from "../Product";
import Slider from "react-slick";
import { ProductType } from "@/types/product";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 820,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SimilarProductDetail = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  return (
    <>
      <h2 className="text-[30px] mb-10 font-bold">Sản phẩm cùng thể loại</h2>
      <Slider {...settings}>
        {relatedProducts?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Slider>
    </>
  );
};
export default React.memo(SimilarProductDetail);
