import SliceShow from "@/components/user/SliceShow.tsx";
import BestSellers from "./BestSellers/BestSellers";
import BlogHomePage from "./BlogHomePage.tsx";
import BrandsPopular from "./BrandsPopular";
import Category from "./Category";
import ProductNew from "./ProductNew/ProductNew";
import ProductOffers from "./ProductOffer";
// import ProductPopular from "./ProductPopular";
import ShopFeatures from "./ShopFeatures";
import Subscribe from "./Subscribe.tsx";
import { useGetAllProductsQuery } from "@/services/productApi.tsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "@/redux/slices/loadingSlice.ts";

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: products, isLoading, refetch } = useGetAllProductsQuery();
  console.log({ products });
  useEffect(() => {
    dispatch(setLoading(isLoading));
    refetch()
  }, [dispatch, isLoading, refetch]);
  return (
    <>
      <SliceShow />
      <div className="container">
        <Category />
        <ProductNew products={products} />
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
