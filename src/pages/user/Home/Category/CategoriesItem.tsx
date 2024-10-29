interface CategoriesItemProps {
  title?: string;
  urlImage?: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoriesItem: React.FC<CategoriesItemProps> = ({
  title,
  urlImage,
  isActive,
  onClick,
}) => {
  return (
    <div
      className="transform cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
      onClick={onClick}
    >
      <div
        className={`flex items-end justify-center rounded-lg bg-[#F1DEB4] px-[49px] pt-[30px] ${
          isActive ? "shadow-md shadow-[#5ba2a8]" : ""
        }`}
      >
        <img
          src={urlImage}
          alt={title}
          className="h-[180px] w-[172px] object-contain"
        />
      </div>
      <h4
        className={`mt-[18px] text-center text-[20px] font-bold leading-[150%] ${
          isActive ? "text-[#005D63]" : ""
        }`}
      >
        {title}
      </h4>
    </div>
  );
};

export default CategoriesItem;
