export interface CategoryType {
  id: number;
  name: string;
  slug: string;
  image: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
