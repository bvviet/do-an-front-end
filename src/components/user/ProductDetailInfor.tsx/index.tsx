import Carousel from "./Carousel";
import start from "../../../assets/icons/start.png";
import { useState } from "react";
import FormDetail from "./FormDetail";
import Comment from "./Comment";
import Reviews from "./ReviewList";
import SimilarProductDetail from "./SimilarProductDetail";
import AboutProduct from "./AboutProduct";

const ProductDetailInfo = () => {
    const [image, setImage] = useState<string>(
        "https://s3-alpha-sig.figma.com/img/4460/9b9b/93c74dea7c16d7a286628354e79cd4cb?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D5l~D~JT4L0Nvgfj8uxwao8t2nNW9K98ABkx7Suh5UDVsELGw0-bbSKcvaECIXRYuf-G4DsFm3gy8YJmh2wsHZcBap60-Z1OBcOgA8anyfEmAnN20GIu1fVPz6VnexjJZ5QGMRKAoX1UsGNgstodpdnbOrExJ0FE60YHLcQlxTvesRU~26ruHfXkD2PqZlHO~OZSdf9DVsc6Q1FIA3EAevw9Vdy600gmIzIPyx1dsm~nJmd-cPmYi8ezMXsp613UA9o8SpeXKbaPbFapfS1g-80ocXmY-rK2vQZ6ztSdf0LahlGi-nqOSfVb3Q9iWwrJiDLVacpGXpxUEkdsPADdYA__"
    );

    return (
        <div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
                    {/* Left */}
                    <div className="">
                        {/* Image */}
                        <div className="w-full h-[300px] lg:h-[570px] bg-[#FEFFE9] mb-[18px] flex items-center justify-center">
                            <img className="w-[55%] h-[89%] object-cover flex rounded-md" src={`${image}`} alt="" />
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
