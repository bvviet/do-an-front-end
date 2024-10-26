import { useGetAllSizeQuery } from "@/services/productApi";

export const useSizes = () => {
  const { data, error, isLoading } = useGetAllSizeQuery();

  return {
    sizes: data?.sizes || [], // Trả về danh sách colors, nếu không có thì là mảng rỗng
    error,
    isLoading,
  };
};
