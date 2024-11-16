import useFormatCurrency from "@/hooks/useFormatCurrency";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useGetCategoriesQuery } from "@/services/authApi";
import { useFilterProductsQuery } from "@/services/productApi";
import { ICategory } from "@/types/genre";
import { formatCurrency } from "@/utils/formatCurrency";
import { Favorite } from "@mui/icons-material";
import { Box, Button, IconButton, Slider as MuiSlider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function valuetext(value: number) {
  return `${value}₫`;
}

const Filter = () => {
  const [value, setValue] = useState<number[]>([0, 1000000]);
  const [drop, setDrop] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCategorySelect = (itemId: number) => {
    setCategory((prevCategory) => {
      const newCategory = prevCategory.includes(itemId)
        ? prevCategory.filter((id) => id !== itemId)
        : [...prevCategory, itemId];
      setDrop(true);
      return newCategory;
    });
  };

  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const [category, setCategory] = useState<number[]>([]);

  const { data: products, isLoading: isLoadingFilter } = useFilterProductsQuery(
    {
      categories: category,
      minPrice: value[0],
      maxPrice: value[1],
    },
    {
      skip: !drop,
    },
  );

  useEffect(() => {
    if (products) {
      setDrop(false);
    }
  }, [products]);

  useEffect(() => {
    dispatch(setLoading(isLoadingCategories || isLoadingFilter));
  }, [dispatch, isLoadingCategories, isLoadingFilter]);

  return (
    <div className="container mb-20">
      <div className="mb-[70px] mt-[100px] flex flex-col items-center justify-center gap-[20px]">
        <h1 className="font-slab text-[4.2rem] font-bold leading-[123.81%]">
          Product List
        </h1>
        <p className="leading-[175%] text-[#566363]">
          We hear what you need. We plan, design & develop visionary concept
          websites.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-[30px]">
        {/* Products Section */}
        <div className="col-span-12 grid grid-cols-3 gap-x-[30px] gap-y-[40px] md:col-span-8">
          {products?.length !== 0 ? (
            products?.map((product) => (
              <div
                key={product.id}
                className="group relative p-5 shadow-lg shadow-indigo-500/20"
              >
                <Link to={"#"} className="relative block h-[250px] w-full">
                  <img
                    src={product.img_thumbnail}
                    alt={product.name}
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button variant="contained">Add to Cart</Button>
                  </div>
                </Link>
                <div className="mt-[15px] flex items-center justify-between">
                  <p className="text-[14px]">{product.category?.name}</p>
                  <IconButton>
                    <Favorite color="error" />
                  </IconButton>
                </div>
                <Link
                  to={`/detail/${product.slug}`}
                  className="leading-[166.667% ] mb-4 mt-2 block text-[1.8rem] font-semibold text-[#131717] hover:text-slate-500"
                >
                  {product.name.length > 20
                    ? `${product.name.slice(0, 30)}...`
                    : product.name}
                </Link>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 line-through">
                    {formatCurrency(product.price_regular)}
                  </p>
                  <p className="text-[#ee4d2d]">
                    {formatCurrency(product.price_sale)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[1.7rem] font-bold">Không có sản phẩm phù hợp</p>
          )}
        </div>

        {/* Filter Form */}
        <section className="col-span-3">
          <div className="h-fit rounded-xl border border-solid border-[#a3a3a3] px-5 py-5 md:col-span-3">
            <h2 className="text-xxl mb-4 font-semibold">Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {categories?.categories.map((item: ICategory) => (
                <p
                  key={item.id}
                  className={`cursor-pointer rounded-lg border border-solid border-[#595959] p-2 text-center text-[1.3rem] text-black hover:text-slate-500 ${
                    category.includes(Number(item.id))
                      ? "bg-slate-800 text-white"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(Number(item.id))}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-10 h-fit rounded-xl border border-solid border-[#a3a3a3] px-8 py-5 md:col-span-3">
            <h2 className="text-xxl mb-4 font-semibold">Filter by Price</h2>
            <Box sx={{ width: "100%" }}>
              <MuiSlider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={1000000}
                step={50000}
                valueLabelFormat={valuetext}
                onChangeCommitted={() => {
                  setDrop(true);
                }}
              />
            </Box>
            <div className="mt-3">
              <p className="text-center font-medium">
                Price: {useFormatCurrency(value[0])} -{" "}
                {useFormatCurrency(value[1])}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Filter;
