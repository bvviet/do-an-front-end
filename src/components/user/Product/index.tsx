import StickerAddFavorite from "./StickerAddFavorite";

import heartWhite from "../../../assets/icons/heartWhite.svg";
// import heartRed from "../../../assets/icons/heartRed.png";
import star from "../../../assets/icons/start.png";
import { useState } from "react";

const ProductItem = () => {
    const [showSticker, setShowSticker] = useState<boolean>(false);

    return (
        <article className="relative w-[370px]">
            {/* Best Seller */}
            <div className="absolute top-[22px] left-[26px] rounded-[5px] bg-black px-[10px] py-[6px] w-fit text-white text-[1.4rem] leading-[171.429%]">
                Best Seller
            </div>

            {/* Product Image */}
            <div className="relative">
                <a href="#!">
                    <img
                        src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-full h-[310px] object-cover rounded-[10px]"
                    />
                </a>
                {/* StickerAddFavorite positioned at the bottom */}
                {showSticker && (
                    <div className="absolute bottom-0 left-0 right-0">
                        <StickerAddFavorite showSticker={showSticker} setShowSticker={setShowSticker} />
                    </div>
                )}
            </div>

            {/* Category Name */}
            <div className="flex items-center justify-between mt-[20px] mb-[4px] text-[1.4rem] text-[#566363] leading-[171.429%]">
                <p>Men-Cloths</p>
                <button onClick={() => setShowSticker(true)}>
                    <img src={heartWhite} alt="Heart Icon" />
                </button>
            </div>

            {/* Title */}
            <h2 className="text-[20px] text-[#131717] font-bold">Modern Black T-Shirt</h2>

            {/* Price */}
            <div className="flex items-center justify-between mt-[12px] mb-[28px]">
                <div className="flex items-center gap-[6px]">
                    <img src={star} alt="Star Icon" />
                    <p className="text-[#566363] leading-[171.429%]">5.0 (132)</p>
                </div>
                <p className="text-[#131717] text-[1.8rem] font-semibold leading-[166.667%]">$59</p>
            </div>

            {/* Button Add to Cart */}
            <button className="w-full border-[1px] border-[#005D63] text-[#005D63] border-solid hover:bg-[#005D63] hover:text-white py-[13px] rounded-[5px] text-[1.8rem] font-semibold leading-[166.667%] transition-colors duration-500 ease-in-out">
                Add to Cart
            </button>
        </article>
    );
};

export default ProductItem;
