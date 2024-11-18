import { FC, useState } from "react";
import BaseSection from "../BaseSection";
import ProductItem from "../../../../components/user/Product";
import { getAllProductsResponse } from "@/types/product";

interface ProductNewProps {
  products?: getAllProductsResponse;
}

const ProductNew: FC<ProductNewProps> = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  // Khai báo productNew ở ngoài if block
  const productNew = products?.products?.filter(
    (product) => product.is_new === true,
  );

  // Đảm bảo rằng showHide kiểm tra productNew một cách chính xác
  const showHide = visibleCount < (productNew?.length || 0);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > (productNew?.length || 0) ? prevCount : prevCount + 6,
    );
  };

  return (
    <BaseSection
      typeProduct={true}
      title="Sản phẩm mới"
      description="Cập nhật những xu hướng thời trang mới nhất để nâng tầm phong cách của bạn."
      handleShowMore={handleShowMore}
      showHide={showHide}
    >
      {productNew
        ?.slice(0, visibleCount)
        .map((product) => (
          <ProductItem key={product.id} newProduct={true} product={product} />
        ))}
    </BaseSection>
  );
};

export default ProductNew;
