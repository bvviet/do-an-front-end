interface CategoriesItemProps {
    title?: string;
    urlImage?: string;
    isActive: boolean;
    onClick: () => void;
}

const CategoriesItem: React.FC<CategoriesItemProps> = ({ title, urlImage, isActive, onClick }) => {
    return (
        <div className={`cursor-pointer transition-all ease-in-out duration-300`} onClick={onClick}>
            <div
                className={`bg-[#F1DEB4] flex items-end justify-center px-[49px] pt-[30px] rounded-lg ${
                    isActive ? "shadow-md shadow-[#5ba2a8]" : ""
                }`}
            >
                <img src={urlImage} alt={title} className="w-[172px] h-[180px] object-contain" />
            </div>
            <h4
                className={`mt-[18px] text-center font-bold text-[20px] leading-[150%] ${
                    isActive ? "text-[#005D63]" : ""
                }`}
            >
                {title}
            </h4>
        </div>
    );
};

export default CategoriesItem;
