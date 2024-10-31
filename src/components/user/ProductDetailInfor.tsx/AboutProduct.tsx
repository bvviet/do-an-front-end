import { FC } from "react";

interface AboutProductProps {
  productContent: string | undefined;
  userManual: string | undefined;
}

const AboutProduct: FC<AboutProductProps> = ({
  productContent,
  userManual,
}) => {
  return (
    <div className="my-[55px] w-full text-[1.8rem] leading-[166.667%] text-[#566363] lg:w-[50%]">
      <h4 className="font-bold font-manrope text-[#131717]">Về sản phẩm này</h4>
      <p className="mb-[20px] mt-[18px] text-[16px] font-manrope">{productContent}</p>
      <p className="font-manrope text-[16px]">
        <span className="text-[1.8rem] font-semibold font-manrope leading-[166.667%] text-[#131717]">
          Hướng dẫn sử dụng:
        </span>
        {userManual}
      </p>
    </div>
  );
};
export default AboutProduct;
