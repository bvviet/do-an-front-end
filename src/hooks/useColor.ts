import { useGetAllColorQuery } from "@/services/productApi";

export const useColors = () => {
  const { data, error, isLoading } = useGetAllColorQuery();

  return {
    colors: data?.colors || [], // Trả về danh sách colors, nếu không có thì là mảng rỗng
    error,
    isLoading,
  };
};
