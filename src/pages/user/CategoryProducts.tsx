import { useEffect, useState } from "react";
import BaseSection from "./Home/BaseSection";
import ProductItem from "@/components/user/Product";
import { useGetCategoryProductsQuery } from "@/services/authApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

const CategoryProducts = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const { categoriesChildId } = useParams();
  const dispatch = useDispatch();
  const numericId = categoriesChildId ? parseInt(categoriesChildId, 10) : 0;
  const { data: products, isLoading } = useGetCategoryProductsQuery(numericId);
  // Khai báo productNew ở ngoài if block

  const productCategory = products?.products || [];

  // Đảm bảo rằng showHide kiểm tra productCategory một cách chính xác
  const showHide = visibleCount < (productCategory?.length || 0);

  const handleShowMore = () => {
    if (visibleCount < productCategory?.length) {
      setVisibleCount((prevCount) => prevCount + 6);
    } else {
      setVisibleCount(6);
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className="container">
      <BaseSection
        typeProduct={true}
        title={`${products?.message} `}
        description="Browse our new products and make your day more beautiful and glorious."
        handleShowMore={handleShowMore}
        showHide={showHide}
      >
        {productCategory
          ?.slice(0, visibleCount)
          .map((product) => (
            <ProductItem key={product?.id} product={product} />
          ))}
      </BaseSection>
    </div>
  );
};

export default CategoryProducts;
