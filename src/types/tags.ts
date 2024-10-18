export interface TagsType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}
