import { useEffect, useState } from "react";
import ProductItem from "../../../../components/user/Product";
import bannerOffers from "../../../../assets/images/BannerOffers.png";
import fire from "@/assets/images/fire.png";
import { useGetProductsSellQuery } from "@/services/productApi";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

const ProductOffers = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const dispatch = useDispatch();

  const { data: products, isLoading } = useGetProductsSellQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  const productOffer = products?.data;
  console.log({ productOffer });

  const showHide = visibleCount < (productOffer?.length || 0);

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      prevCount + 6 > (productOffer?.length || 0) ? prevCount : prevCount + 6,
    );
  };

  return (
    <>
      <div className="items-centers mb-[60px] flex w-[99.5%] origin-center rotate-[-3deg] justify-evenly bg-[#131717] py-[20px] text-white sm:mb-[112px] sm:mt-[50px]">
        <div className="hidden items-center lg:flex">
          <span className="leading-[150% ] text-[1.3rem] font-bold lg:text-[1.6rem]">
            GET 50% OFF IN THE BELOW PRODUCT
          </span>
        </div>
        <div className="hidden items-center xl:flex">
          <img src={fire} alt="" />
          <span className="leading-[150% ] text-[1.3rem] font-bold lg:text-[1.6rem]">
            GET 50% OFF IN THE BELOW PRODUCT
          </span>
        </div>
        <div className="hidden items-center sm:flex">
          <img src={fire} alt="" />
          <span className="leading-[150% ] text-[1.3rem] font-bold lg:text-[1.6rem]">
            GET 50% OFF IN THE BELOW PRODUCT
          </span>
        </div>
        <div className="flex items-center">
          <img src={fire} alt="" />
          <span className="leading-[150% ] text-[1.3rem] font-bold lg:text-[1.6rem]">
            GET 50% OFF IN THE BELOW PRODUCT
          </span>
        </div>
      </div>
      <div className="container mb-[50px] lg:mb-[75px]">
        <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2 xl:grid-cols-3">
          <img
            src={bannerOffers}
            alt=""
            className="h-auto w-full xl:col-span-2"
          />
          {/* Display the first product if available */}
          {productOffer && productOffer.length > 0 && (
            <ProductItem
              bestSeller={true}
              product={productOffer[productOffer.length - 1]}
            />
          )}
        </div>
        <div className="mt-[30px] grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {productOffer
            ?.slice(0, visibleCount)
            .map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                bestSeller={true}
              />
            ))}
        </div>
        <div className="mt-[60px] flex items-center justify-center lg:mt-[75px]">
          <button
            onClick={handleShowMore}
            className="rounded-md bg-[#005D63] px-[35px] py-[15px] text-center"
          >
            {showHide ? "Xem Thêm" : "Ẩn Bớt"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductOffers;
