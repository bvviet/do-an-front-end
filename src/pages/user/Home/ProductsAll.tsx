import { FC, useState } from "react";
import { getAllProductsResponse } from "@/types/product";
import BaseSection from "./BaseSection";
import ProductItem from "@/components/user/Product";

interface ProductNewProps {
  products?: getAllProductsResponse;
}

const ProductsAll: FC<ProductNewProps> = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  // Khai báo productNew ở ngoài if block
  const productAll = products?.products;

  const showHide = visibleCount < (productAll?.length || 0);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > (productAll?.length || 0) ? prevCount : prevCount + 6,
    );
  };

  return (
    <BaseSection
      typeProduct={true}
      title="Tất cả sản phẩm"
      description="Khám phá những mẫu thời trang mới nhất và làm nổi bật phong cách của bạn mỗi ngày."
      handleShowMore={handleShowMore}
      showHide={showHide}
    >
      {productAll
        ?.slice(0, visibleCount)
        .map((product) => (
          <ProductItem key={product.id} newProduct={true} product={product} />
        ))}
    </BaseSection>
  );
};

export default ProductsAll;
