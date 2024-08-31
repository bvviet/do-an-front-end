import { FC } from "react";

interface ShopFeaturesItemProps {
    imgUrl: string;
    title: string;
    description: string;
}

const ShopFeaturesItem: FC<ShopFeaturesItemProps> = ({ imgUrl, title, description }) => {
    return (
        <section className="bg-white flex flex-col items-center justify-center py-[38px] px-[20px] rounded-md">
            <img src={imgUrl} alt="" />
            <h4 className="font-bold text-[2rem] mt-[28px] mb-[16px] leading-[150%]">{title}</h4>
            <p className="text-[1.4rem] text-[#566363] text-center leading-[171.429% ]">{description}</p>
        </section>
    );
};
export default ShopFeaturesItem;
