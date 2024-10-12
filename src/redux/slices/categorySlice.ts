// categorySlice.ts
import { ICategory } from "@/types/genre";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CategoryState {
  categories: ICategory[]; // Thay đổi kiểu dữ liệu này nếu cần
  loading: boolean;
  error: string | null; // Cập nhật kiểu cho error
}
const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    console.log(data);
    return data;
  },
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export default categorySlice.reducer;
