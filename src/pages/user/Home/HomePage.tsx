// import ProductItem from "../../components/user/Product";

import BestSellers from "./BestSellers/BestSellers";
import BrandsPopular from "./BrandsPopular";
import Category from "./Category";
import ProductNew from "./ProductNew/ProductNew";
import ProductOffers from "./ProductOffer";
import ProductPopular from "./ProductPopular";
import ShopFeatures from "./ShopFeatures";

const HomePage = () => {
    return (
        <>
            <div className="container">
                <Category />
                <ProductPopular />
                <ProductNew />
                <BestSellers />
                <ProductOffers />
                <BrandsPopular />
            </div>
            <ShopFeatures />
        </>
    );
};
export default HomePage;
