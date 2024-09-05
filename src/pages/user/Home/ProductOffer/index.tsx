import { useState } from "react";
import ProductItem from "../../../../components/user/Product";
import bannerOffers from "../../../../assets/images/BannerOffers.png";
import fire from "@/assets/images/fire.png";

const ProductOffers = () => {
    const [visibleCount, setVisibleCount] = useState(6);
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
        <>
            <div className="w-[99.5%] flex items-centers justify-evenly text-white bg-[#131717] origin-center rotate-[-3deg] sm:mt-[50px] mb-[60px] sm:mb-[112px] py-[20px]">
                <div className="hidden items-center lg:flex">
                    <span className="font-bold text-[1.3rem] lg:text-[1.6rem] leading-[150% ]">
                        GET 50% OFF IN THE BELOW PRODUCT
                    </span>
                </div>
                <div className="hidden items-center xl:flex">
                    <img src={fire} alt="" />
                    <span className="font-bold text-[1.3rem] lg:text-[1.6rem] leading-[150% ]">
                        GET 50% OFF IN THE BELOW PRODUCT
                    </span>
                </div>
                <div className="hidden items-center sm:flex">
                    <img src={fire} alt="" />
                    <span className="font-bold text-[1.3rem] lg:text-[1.6rem] leading-[150% ]">
                        GET 50% OFF IN THE BELOW PRODUCT
                    </span>
                </div>
                <div className="flex items-center">
                    <img src={fire} alt="" />
                    <span className="font-bold text-[1.3rem] lg:text-[1.6rem] leading-[150% ]">
                        GET 50% OFF IN THE BELOW PRODUCT
                    </span>
                </div>
            </div>
            <div className="container mb-[50px] lg:mb-[75px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[30px]">
                    <img src={bannerOffers} alt="" className="xl:col-span-2 w-full h-auto" />
                    <ProductItem />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[30px] mt-[30px]">
                    {arr.map(() => (
                        <ProductItem />
                    ))}
                </div>
                <div className="flex items-center justify-center mt-[60px] lg:mt-[75px]">
                    <button
                        onClick={handleShowMore}
                        className="bg-[#005D63] text-center px-[35px] py-[15px] rounded-md"
                    >
                        {showHide ? "VIEW MORE" : "HIDE"}
                    </button>
                </div>
            </div>
        </>
    );
};
export default ProductOffers;
