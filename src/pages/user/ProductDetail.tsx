import ProductDetailInfo from "@/components/user/ProductDetailInfor.tsx";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : 0;
  return (
    <div className="container mb-[150px]">
      <ProductDetailInfo id={numericId} />
    </div>
  );
};
export default ProductDetail;
