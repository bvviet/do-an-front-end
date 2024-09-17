import Carousel from "./Carousel";
import start from "../../../assets/icons/start.png";
import { useState } from "react";
import FormDetail from "./FormDetail";
import Comment from "./Comment";
import Reviews from "./ReviewList";
import SimilarProductDetail from "./SimilarProductDetail";
import AboutProduct from "./AboutProduct";
import ao1 from '../../../../public/images/ao1.png'

const ProductDetailInfo = () => {
    const [image, setImage] = useState<string>(
        ao1
    );

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
                    {/* Left */}
                    <div className="">
                        {/* Image */}
                        <div className="w-full h-[300px] lg:h-[570px] bg-[#FEFFE9] mb-[18px] flex items-center justify-center">
                            <img className="w-[80%] h-[89%] object-cover flex rounded-md" src={`${image}`} alt="" />
                        </div>
                        {/* Images */}
                        <Carousel SetImage={setImage} />
                    </div>
                    {/* Right */}
                    <div className="w-full lg:w-[470px] ml-auto">
                        <div>
                            <p className="text-[#566363] leading-[171.429%]">Women-Cloths</p>
                            <div className="flex flex-col gap-[12px]">
                                <h3 className="text-[#131717] text-[2.4rem] font-bold leading-[141.667%]">
                                    Modern Green Sweater
                                </h3>
                                <div className="flex items-center gap-[8px]">
                                    <span className="text-[#566363] text-[1.8rem] leading-[166.667%]">$120</span>
                                    <span className="text-[#F86624] text-[1.8rem] leading-[166.667%] font-semibold">
                                        $60
                                    </span>
                                </div>
                                <div className="flex items-center gap-[6px]">
                                    <img src={start} alt="" />
                                    <span className="text-[#566363] text-[1.8rem] leading-[166.667%]">5.0 (37)</span>
                                </div>
                            </div>
                            {/* Form */}
                            <FormDetail />
                        </div>
                    </div>
                </div>
                {/* About product */}
                <AboutProduct />
            </div>
            {/* Comment Form */}
            <Comment />
            {/* Comment */}
            <Reviews />
            {/* Similar Product */}
            <SimilarProductDetail />
        </div>
    );
};

export default ProductDetailInfo;
