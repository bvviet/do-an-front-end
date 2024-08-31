import CategoriesItem from "./CategoriesItem";
import men from "../../../../assets/images/menFashion.png";
import women from "../../../../assets/images/woment.png";
import kids from "../../../../assets/images/kids.png";
import baby from "../../../../assets/images/baby.png";
import { useState } from "react";
import BaseSection from "../BaseSection";

const Category = () => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string) => {
        setActiveCategory((prevCategory) => (prevCategory === category ? null : category));
    };

    return (
        <BaseSection title="Explore, find exactly what you need" typeProduct={false}>
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
        </BaseSection>
    );
};
export default Category;
