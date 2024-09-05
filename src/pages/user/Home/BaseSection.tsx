import { FC, ReactNode } from "react";

interface BaseSectionProps {
    children: ReactNode;
    title?: string;
    description?: string;
    typeProduct: boolean;
    handleShowMore?: () => void;
    showHide?: boolean;
}

const BaseSection: FC<BaseSectionProps> = ({ children, title, description, typeProduct, handleShowMore, showHide }) => {
    const handleClick = () => {
        if (handleShowMore) {
            handleShowMore();
        }
    };
    return (
        <div className="py-[50px] sm:py-[75px]">
            <h2 className="text-[3.2rem] lg:text-[4.2rem] font-bold max-w-[470px] font-slab">{title}</h2>
            {description && (
                <p className="text-[1.8rem] text-[#566363] max-w-[326px] lg:max-w-[470px] mt-[27px] lg:mt-[18px]">
                    {description}
                </p>
            )}
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ${
                    typeProduct ? "xl:grid-cols-3" : "xl:grid-cols-4"
                }  gap-[20px] lg:gap-[30px] ${
                    typeProduct ? "" : "px-[55px]"
                }  sm:px-0 mt-[40px] lg:mt-[70px]`}
            >
                {children}
            </div>
            <div className="flex items-center justify-center mt-[60px] lg:mt-[75px]">
                {typeProduct && (
                    <button onClick={handleClick} className="bg-[#005D63] text-center px-[35px] py-[15px] rounded-md">
                        {showHide ? "VIEW MORE" : "HIDE"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BaseSection;
