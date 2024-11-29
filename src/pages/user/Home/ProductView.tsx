/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { getAllProductsResponse } from "@/types/product";
import ProductItem from "@/components/user/Product";
import { useGetViewProductsQuery } from "@/services/productApi";

interface ProductNewProps {
  products?: getAllProductsResponse;
}

const ProductsView: FC<ProductNewProps> = () => {
  const { data } = useGetViewProductsQuery();

  return (
    <div>
      <h2 className="max-w-[470px] font-slab text-[3.2rem] font-bold lg:text-[4.2rem]">
        Sản phẩm được quan tâm
      </h2>
      <div className="mt-[40px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:px-0 lg:mt-[70px] lg:grid-cols-2 lg:gap-[30px] xl:grid-cols-3">
        {(data || []).map((product: any) => (
          <ProductItem key={product.id} productsHot={true} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
