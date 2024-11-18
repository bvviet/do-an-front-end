import BaseSection from "./BaseSection";
import CategoriesItem from "./Category/CategoriesItem";

import nike from "../../../assets/icons/nike.png";
import adidas from "../../../assets/icons/adidas.png";
import puma from "../../../assets/icons/puma.png";
import louis from "../../../assets/icons/louis.png";
// import LousisVuitton from "../../../assets/icons/LousisVuitton.png";

const BrandsPopular = () => {
  return (
    <BaseSection
      title="Khám phá các thương hiệu nổi tiếng."
      typeProduct={false}
    >
      <CategoriesItem title="Nike Brand" urlImage={nike} />
      <CategoriesItem title="Adidas Brand" urlImage={adidas} />
      <CategoriesItem title="Puma Brand" urlImage={puma} />
      <CategoriesItem title="Louis Vuitton Brand" urlImage={louis} />
    </BaseSection>
  );
};
export default BrandsPopular;
