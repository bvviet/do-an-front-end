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
import { Favorite } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
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
    <div className="container mx-auto mb-[100px] mt-[50px] p-6">
      <div className="mb-8 text-center">
        <h1 className="text-[2rem] font-bold text-gray-800">
          Danh sách yêu thích
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 lg:grid-cols-3">
        {/* Item 1 */}
        {(favoritess?.data || []).map((favorite) => (
          <div
            key={favorite.id}
            className="group relative rounded-lg border border-solid border-[#afaeae3a] p-5 shadow-sm shadow-indigo-500/20"
          >
            <Link to={"#"} className="relative block h-[250px] w-full">
              <img
                src={favorite.product.img_thumbnail}
                alt={favorite.product.name}
                className="h-full w-full rounded-[10px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                  variant="contained"
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
            </Link>
            <div className="mt-[15px] flex items-center justify-between">
              <IconButton>
                <Favorite color="error" />
              </IconButton>
            </div>
            <Link
              to={`/detail/${favorite.product.slug}`}
              className="leading-[166.667% ] mb-4 mt-2 block text-[1.8rem] font-semibold text-[#131717] hover:text-slate-500"
            >
              {favorite.product.name.length > 20
                ? `${favorite.product.name.slice(0, 30)}...`
                : favorite.product.name}
            </Link>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 line-through">
                {formatCurrency(favorite.product.price_regular)}
              </p>
              <p className="text-[#ee4d2d]">
                {formatCurrency(favorite.product.price_sale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
