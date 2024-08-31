import { useState } from "react";
import BaseSection from "../BaseSection";
import ProductItem from "../../../../components/user/Product";

const ProductNew = () => {
    const [visibleCount, setVisibleCount] = useState(3);
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const arr = array.slice(0, visibleCount);

    const showHide = visibleCount < array.length;

    const handleShowMore = () => {
        if (visibleCount < array.length) {
            setVisibleCount((prevCount) => prevCount + 6);
        } else {
            setVisibleCount(3);
        }
    };
    return (
        <BaseSection
            typeProduct={true}
            title="Our New Products"
            description="Browse our new products and make your day more beautiful and glorious."
            handleShowMore={handleShowMore}
            showHide={showHide}
        >
            {arr.map((index) => (
                <ProductItem key={index} newProduct={true} />
            ))}
        </BaseSection>
    );
};
export default ProductNew;
