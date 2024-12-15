import { FC, ReactNode } from "react";

interface BaseSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  typeProduct: boolean;
  handleShowMore?: () => void;
  showHide?: boolean;
}

const BaseSection: FC<BaseSectionProps> = ({
  children,
  title,
  description,
  typeProduct,
  handleShowMore,
  showHide,
}) => {
  const handleClick = () => {
    if (handleShowMore) {
      handleShowMore();
    }
  };
  return (
    <div className="py-[50px] sm:py-[75px]">
      <h2 className="max-w-[50%] font-slab text-[3.2rem] font-bold lg:text-[4.2rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-[27px] max-w-[326px] text-[1.8rem] text-[#566363] lg:mt-[18px] lg:max-w-[470px]">
          {description}
        </p>
      )}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ${
          typeProduct ? "xl:grid-cols-3" : "xl:grid-cols-4"
        } gap-[20px] lg:gap-[30px] ${
          typeProduct ? "" : "px-[55px]"
        } mt-[40px] sm:px-0 lg:mt-[70px]`}
      >
        {children}
      </div>
      <div className="mt-[60px] flex items-center justify-center lg:mt-[75px]">
        {typeProduct && (
          <button
            onClick={handleClick}
            className="rounded-md bg-[#005D63] px-[35px] py-[15px] text-center"
          >
            {showHide ? "Xem Thêm" : "Ẩn Bớt"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BaseSection;
