import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
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
import { loOutMiddleware } from "./middleware";

// Cấu hình persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [authApi.reducerPath],
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Kết hợp reducer với redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình Redux Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        // Thay đổi đây để truyền vào action types như là một array
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }).concat(loOutMiddleware, authApi.middleware);
  },
});

// Tạo persistStore
export const persistor = persistStore(store);
// Xác định kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
