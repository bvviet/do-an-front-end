import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import loadingReducer from "./slices/loadingSlice";
import { authApi } from "@/services/authApi";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import { logOutMiddleware } from "./middleware";
import categoryReducer from "../redux/slices/categorySlice"; // Nhập categoryReducer

// Cấu hình cho redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [authApi.reducerPath],
};

// Kết hợp các reducer lại với nhau
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  categories: categoryReducer, // Thêm categoryReducer vào rootReducer
  loading: loadingReducer,
});

// Kết hợp reducer với redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action không thể serialize
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }).concat(logOutMiddleware, authApi.middleware);
   } // Thêm middleware tùy chỉnh và middleware của authApi
});

// Tạo persistStore
export const persistor = persistStore(store);

// Xác định kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
