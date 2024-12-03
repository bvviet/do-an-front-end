import { FC } from "react";
import { getAllProductsResponse } from "@/types/product";
import ProductItem from "@/components/user/Product";

interface ProductNewProps {
  products?: getAllProductsResponse;
}

const ProductNew: FC<ProductNewProps> = ({ products }) => {
  // Lấy danh sách sản phẩm mới, giới hạn số lượng tối đa là 9
  const productNews = [...(products?.products || [])].reverse().slice(0, 9);

  return (
    <div className="my-[150px]">
      <h2 className="max-w-[470px] font-slab text-[3.2rem] font-bold lg:text-[4.2rem]">
        Sản phẩm mới
      </h2>
      <div className="mt-[40px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:px-0 lg:mt-[70px] lg:grid-cols-2 lg:gap-[30px] xl:grid-cols-3">
        {productNews.map((product) => (
          <ProductItem key={product.id} newProduct={true} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductNew;
