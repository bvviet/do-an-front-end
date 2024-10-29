import { FC } from "react";

interface ShopFeaturesItemProps {
  imgUrl: string;
  title: string;
  description: string;
}

const ShopFeaturesItem: FC<ShopFeaturesItemProps> = ({
  imgUrl,
  title,
  description,
}) => {
  return (
    <section className="flex flex-col items-center justify-center rounded-md bg-white px-[20px] py-[38px]">
      <div className="w-[50%] transform transition-all duration-300 ease-in-out hover:scale-105">
        <img src={imgUrl} alt="" className="w-full object-cover" />
      </div>
      <h4 className="mb-[16px] mt-[28px] text-[2rem] font-bold leading-[150%]">
        {title}
      </h4>
      <p className="leading-[171.429% ] text-center text-[1.4rem] text-[#566363]">
        {description}
      </p>
    </section>
  );
};
export default ShopFeaturesItem;
