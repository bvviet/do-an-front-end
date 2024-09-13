import CategoriesItem from "./CategoriesItem";
import men from "../../../../assets/images/menFashion.png";
import women from "../../../../assets/images/woment.png";
import kids from "../../../../assets/images/kids.png";
import baby from "../../../../assets/images/baby.png";
import { useState } from "react";

const Category = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? null : category,
    );
  };

  return (
    <div className="lg:mb-[75px] lg:mt-[150px] mt-[100px] mb-[50px] px-[30px] lg:px-0">
      <h2 className="max-w-[470px] font-slab text-[3.2rem] font-bold lg:text-[4.2rem]">
        Explore, find exactly what you need
      </h2>
      <div
        className={`"xl:grid-cols-4" "px-[55px]" mt-[40px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:px-0 lg:mt-[70px] lg:grid-cols-4 lg:gap-[30px]`}
      >
        <CategoriesItem
          title="Men"
          urlImage={men}
          isActive={activeCategory === "Men"}
          onClick={() => handleCategoryClick("Men")}
        />
        <CategoriesItem
          title="Women"
          urlImage={women}
          isActive={activeCategory === "Women"}
          onClick={() => handleCategoryClick("Women")}
        />
        <CategoriesItem
          title="Women"
          urlImage={kids}
          isActive={activeCategory === "kids"}
          onClick={() => handleCategoryClick("kids")}
        />
        <CategoriesItem
          title="Women"
          urlImage={baby}
          isActive={activeCategory === "baby"}
          onClick={() => handleCategoryClick("baby")}
        />
      </div>
    </div>
  );
};
export default Category;
