import { useState } from "react";
import BaseSection from "./BaseSection";
import CategoriesItem from "./Category/CategoriesItem";

import nike from "../../../assets/icons/nike.png";
import adidas from "../../../assets/icons/adidas.png";
import puma from "../../../assets/icons/puma.png";
import louis from "../../../assets/icons/louis.png";
// import LousisVuitton from "../../../assets/icons/LousisVuitton.png";

const BrandsPopular = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };
  return (
    <BaseSection title="Explore from popular brands" typeProduct={false}>
      <CategoriesItem
        title="Nike Brand"
        urlImage={nike}
        isActive={activeCategory === "nike"}
        onClick={() => handleCategoryClick("nike")}
      />
      <CategoriesItem
        title="Adidas Brand"
        urlImage={adidas}
        isActive={activeCategory === "nike"}
        onClick={() => handleCategoryClick("nike")}
      />
      <CategoriesItem
        title="Puma Brand"
        urlImage={puma}
        isActive={activeCategory === "nike"}
        onClick={() => handleCategoryClick("nike")}
      />
      <CategoriesItem
        title="Louis Vuitton Brand"
        urlImage={louis}
        isActive={activeCategory === "nike"}
        onClick={() => handleCategoryClick("nike")}
      />
    </BaseSection>
  );
};
export default BrandsPopular;
