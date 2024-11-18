import CategoriesItem from "./CategoriesItem";
import men from "../../../../assets/images/menFashion.png";
import women from "../../../../assets/images/woment.png";
import kids from "../../../../assets/images/kids.png";
import baby from "../../../../assets/images/baby.png";

const Category = () => {
  return (
    <div className="mb-[50px] mt-[100px] px-[30px] lg:mb-[75px] lg:mt-[150px] lg:px-0">
      <h2 className="max-w-[470px] font-slab text-[3.2rem] font-bold lg:text-[4.2rem]">
        Khám phá, tìm kiếm một cách dễ dàng.
      </h2>
      <div
        className={`"xl:grid-cols-4" "px-[55px]" mt-[40px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 sm:px-0 lg:mt-[70px] lg:grid-cols-4 lg:gap-[30px]`}
      >
        <CategoriesItem title="Men" urlImage={men} />
        <CategoriesItem title="Women" urlImage={women} />
        <CategoriesItem title="Women" urlImage={kids} />
        <CategoriesItem title="Women" urlImage={baby} />
      </div>
    </div>
  );
};
export default Category;
