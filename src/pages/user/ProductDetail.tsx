import ProductDetailInfo from "@/components/user/ProductDetailInfor.tsx";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { slug } = useParams();
  const slugProduct = String(slug);

  return (
    <div className="container mb-[150px]">
      <ProductDetailInfo id={slugProduct} />
    </div>
  );
};
export default ProductDetail;
