import Confirm from "@/components/Confirm";
import { ErrorType } from "@/components/user/Product";
import { useModalContext } from "@/contexts/ModelPopUp/ModelProvider";
import { removeFavorite, setFavorite } from "@/redux/slices/favorites";
import { setLoading } from "@/redux/slices/loadingSlice";
import {
  useDeleteFavoriteMutation,
  useGetFavoritesQuery,
} from "@/services/productApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favorites = () => {
  const { openPopup } = useModalContext();
  const [deleteFavorite, { isLoading: isLoadingDelete }] =
    useDeleteFavoriteMutation();
  const {
    data: favoritess,
    refetch,
    isLoading: isLoadingGet,
    error,
  } = useGetFavoritesQuery();
  const disPatch = useDispatch();
  if (
    (error as ErrorType)?.data?.message === "Không có sản phẩm yêu thích nào"
  ) {
    disPatch(removeFavorite());
  }

  useEffect(() => {
    disPatch(setFavorite(favoritess?.data));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteFavorite(id).unwrap();
      const refetchedFavorites = await refetch();
      console.log("Dữ liệu sau khi refetch:", refetchedFavorites);
      disPatch(setFavorite(refetchedFavorites?.data?.data));
      // disPatch(removeFavorite());

      toast.success(response.message);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    disPatch(setLoading(isLoadingDelete || isLoadingGet));
  }, [isLoadingDelete, isLoadingGet, disPatch]);

  return (
    <div className="container mx-auto mb-[100px] p-6">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Wish List</h1>
        <p className="text-lg text-gray-500">3 items in your wishlist</p>
      </div>

      <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2 lg:grid-cols-3">
        {/* Item 1 */}
        {(favoritess?.data || []).map((favorite) => (
          <div
            className="overflow-hidden rounded-lg border shadow-xl"
            key={favorite.id}
          >
            <Link to={`/${favorite.product_id}`}>
              <img
                src={favorite.product.img_thumbnail}
                alt="Item 1"
                className="h-[300px] w-full transform object-cover p-5 transition-all duration-300 hover:scale-105"
              />
            </Link>

            <div className="p-4">
              <h3 className="font-bold text-gray-700">
                {favorite?.product.category_id}
              </h3>
              <p className="text-[1.6rem] font-medium text-gray-500">
                {favorite?.product.name}
              </p>
              <div className="my-4 flex items-center gap-5">
                <p className="text-[1.8rem] leading-[166.667%] text-[#566363] line-through">
                  {formatCurrency(favorite.product.price_regular)}
                </p>
                <p className="text-[1.8rem] font-semibold leading-[166.667%] text-[#F86624]">
                  {formatCurrency(favorite.product.price_sale)}
                </p>
              </div>
              <Button
                variant="outlined"
                color="error"
                className="rounde mt-10 w-full py-2 text-white"
                onClick={() =>
                  openPopup(
                    <Confirm
                      titleButton={"Xóa"}
                      handleDelete={() => handleDelete(favorite.product_id)}
                    />,
                  )
                }
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
