import { useState } from "react";
import BaseSection from "./Home/BaseSection";
import ProductItem from "@/components/user/Product";
import { useGetCategoryProductsQuery } from "@/services/authApi";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const { categoriesChildId } = useParams();
  const numericId = categoriesChildId ? parseInt(categoriesChildId, 10) : 0;
  const { data: products } = useGetCategoryProductsQuery(numericId);
  // Khai báo productNew ở ngoài if block
  const productCategory = products?.category.products;

  // Đảm bảo rằng showHide kiểm tra productCategory một cách chính xác
  const showHide = visibleCount < (productCategory?.length || 0);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > (productCategory?.length || 0)
        ? prevCount
        : prevCount + 6,
    );
  };

  return (
    <div className="container">
      <BaseSection
        typeProduct={true}
        title={`Sản phẩm thuộc ${products?.category.name} `}
        description="Browse our new products and make your day more beautiful and glorious."
        handleShowMore={handleShowMore}
        showHide={showHide}
      >
        {productCategory
          ?.slice(0, visibleCount)
          .map((product) => <ProductItem key={product.id} product={product} />)}
      </BaseSection>
    </div>
  );
};

export default CategoryProducts;
