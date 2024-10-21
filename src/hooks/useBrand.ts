// hooks/useBrands.ts
import { useGetAllBrandQuery } from "@/services/productApi";
import { BrandType } from "@/types/brand"; // Đảm bảo rằng bạn đã định nghĩa GetAllBrandsResponse
import { toast } from "react-toastify";

export const useBrands = () => {
  const {
    data,
    error: brandsError,
    isLoading: brandsLoading,
  } = useGetAllBrandQuery();

  // Kiểm tra dữ liệu và khởi tạo giá trị mặc định cho brandsData
  const brandsData: BrandType[] = data?.data || []; // Sửa đổi để lấy đúng thuộc tính `data` từ API response
  console.log("data Brand", brandsData);

  // Kiểm tra lỗi và thông báo nếu có lỗi khi lấy thương hiệu
  if (brandsError) {
    toast.error("Không thể tải danh sách thương hiệu");
  }

  return {
    brandsData,
    brandsLoading,
    brandsError,
  };
};
