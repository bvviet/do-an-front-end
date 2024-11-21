import React, { FC, useEffect, useState } from "react";
import BaseSection from "../../../pages/user/Home/BaseSection";
import ProductItem from "../Product";
import { useGetCategoryProductsQuery } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

interface SimilarProductDetailProps {
  categoriesId: number;
}

const SimilarProductDetail: FC<SimilarProductDetailProps> = ({
  categoriesId,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const { data, isLoading } = useGetCategoryProductsQuery(categoriesId);
  const dispatch = useDispatch();

  // Kiểm tra sản phẩm trong response
  const products = data?.products || [];
  console.log(products);

  const showHide = visibleCount < products.length;

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > products.length ? prevCount : prevCount + 6
    );
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className="container">
      <BaseSection
        typeProduct={true}
        title={`Sản phẩm thuộc cùng thể loại `}
        description="Browse our new products and make your day more beautiful and glorious."
        handleShowMore={handleShowMore}
        showHide={showHide}
      >
        {products.slice(0, visibleCount).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </BaseSection>
    </div>
  );
};

export default React.memo(SimilarProductDetail);
