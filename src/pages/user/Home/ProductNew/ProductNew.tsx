import { useState } from "react";
import BaseSection from "../BaseSection";
import ProductItem from "../../../../components/user/Product";
import { useGetAllProductsQuery } from "@/services/productApi";

const ProductNew = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: products } = useGetAllProductsQuery();
  const productNew = products?.data.filter(
    (product) => product.is_new === true,
  );

  const showHide = visibleCount < (productNew?.length || 0);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > (productNew?.length || 0) ? prevCount : prevCount + 6,
    );
  };

  return (
    <BaseSection
      typeProduct={true}
      title="Our New Products"
      description="Browse our new products and make your day more beautiful and glorious."
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
