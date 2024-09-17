import SliceShow from "@/components/user/SliceShow.tsx";
import BestSellers from "./BestSellers/BestSellers";
import BlogHomePage from "./BlogHomePage.tsx";
import BrandsPopular from "./BrandsPopular";
import Category from "./Category";
import ProductNew from "./ProductNew/ProductNew";
import ProductOffers from "./ProductOffer";
import ProductPopular from "./ProductPopular";
import ShopFeatures from "./ShopFeatures";
import Subscribe from "./Subscribe.tsx";

const HomePage = () => {
  return (
    <>
      <SliceShow />
      <div className="container">
        <Category />
        <ProductPopular />
        <ProductNew />
        <BestSellers />
      </div>
      <ProductOffers />
      <div className="container">
        <BrandsPopular />
      </div>
      <ShopFeatures />
      <BlogHomePage />
      <Subscribe />
    </>
  );
};
export default HomePage;
