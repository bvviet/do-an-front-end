import React from "react";
import ProductItem from "../Product";
import Slider from "react-slick";
import { ProductType } from "@/types/product";


const SimilarProductDetail = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  return (
    <>
      <h2 className="mb-10 text-[30px] font-bold">Sản phẩm cùng thể loại</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2  md:gap-[10px] lg:grid-cols-3">
        {relatedProducts.length === 0 && <p>Không có sản phẩm</p>}
        {relatedProducts?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

    </>
  );
};

export default React.memo(SimilarProductDetail);
