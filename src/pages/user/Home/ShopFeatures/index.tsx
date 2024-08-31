import oto from "../../../../assets/icons/oto.png";
import gift from "../../../../assets/icons/grif.png";
import store from "../../../../assets/icons/store.png";
import platform from "../../../../assets/icons/platform.png";
import ShopFeaturesItem from "./ShopFeaturesItem";
const ShopFeatures = () => {
    return (
        <div className="bg-[#FFD44D]">
            <div className="container">
                <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2 xl:grid-cols-4 py-[100px]">
                    <ShopFeaturesItem
                        imgUrl={oto}
                        title="Same Day Delivery"
                        description="We are providing same day delivery with a minimum cost at anytime anywhere."
                    />
                    <ShopFeaturesItem
                        imgUrl={gift}
                        title="Next Day Delivery"
                        description="We are providing next day delivery without any minimum cost at anytime anywhere."
                    />
                    <ShopFeaturesItem
                        imgUrl={store}
                        title="Multiple Store"
                        description="We have multiple store across the country and soon we will launch more stores."
                    />
                    <ShopFeaturesItem
                        imgUrl={platform}
                        title="Trusted Platform"
                        description="Our clients loves us so much. We are providing the best and bringing the best to the clients."
                    />
                </div>
            </div>
        </div>
    );
};
export default ShopFeatures;
