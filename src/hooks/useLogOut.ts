import { logout } from "@/redux/slices/authSlice";
import { removeCart } from "@/redux/slices/CartSlice";
import { removeFavorite } from "@/redux/slices/favorites";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    dispatch(removeFavorite());
    dispatch(removeCart());
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return { logOut };
};
