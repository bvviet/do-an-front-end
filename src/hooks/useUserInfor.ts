import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useUserInfor = () => {
  return useSelector((state: RootState) => state.auth.userInfo);
};
