export interface BrandType {
  id: number;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
export interface GetAllBrandsResponse {
  message: string; // Thông điệp trả về
  data: BrandType[]; // Mảng thương hiệu
}
