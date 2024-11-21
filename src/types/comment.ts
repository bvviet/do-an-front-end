export interface CreateCommentResponse {
  message: string;
  data: {
    product_id: string;
    user_id: number;
    rating: string;
    content: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export interface GetCommentsMessage {
  message: string;
}

export interface CommentItem {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

export interface GetCommentsResponse {
  success: boolean;
  comments: CommentItem[];
  rating: {
    "5_stars": number;
    "4_stars": number;
    "3_stars": number;
    "2_stars": number;
    "1_stars": number;
  };
  countComments: number;
}
