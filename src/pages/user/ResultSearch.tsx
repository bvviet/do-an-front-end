import { useLocation } from "react-router-dom";
import ProductItem from "@/components/user/Product";
import BaseSection from "./Home/BaseSection";
import { ProductType } from "@/types/product";

const ResultSearch = () => {
  const location = useLocation();
  const resultsSearch = location.state?.results;
  console.log({ resultsSearch });
  const handleShowMore = () => {};

  // const showHide = () => {};
  return (
    <div className="container">
      <BaseSection
        typeProduct={true}
        title="Sản phẩm tìm kiếm"
        description="Khám phá những sản phẩm tuyệt vời"
        handleShowMore={handleShowMore}
        // showHide={showHide}
      >
        {resultsSearch.map((product: ProductType) => (
          <ProductItem key={product.id} newProduct={true} product={product} />
        ))}
      </BaseSection>
    </div>
  );
};

export default ResultSearch;
