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
  const { data: products, isLoading } =
    useGetCategoryProductsQuery(categoriesId);
  const dispatch = useDispatch();

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
        {productCategory
          ?.slice(0, visibleCount)
          .map((product) => <ProductItem key={product.id} product={product} />)}
      </BaseSection>
    </div>
  );
};
export default React.memo(SimilarProductDetail);
