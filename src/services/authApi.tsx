import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import signUpType from "@/types/SignUp";
import loginType from "@/types/SignIn";
import { userType } from "@/types/user";
import { logout } from "@/redux/slices/authSlice";

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

interface updateProfileResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    link_fb: string;
    link_tt: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  avatar_url: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (header, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.access_token;
    if (token) {
      header.set("Authorization", `Bearer ${token}`);
    }
    return header;
  },
});

const baseQueryWithForceLogout = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
    throw new Error("Token expired");
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, signUpType>({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),
    login: builder.mutation<LoginResponse, loginType>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    getUsers: builder.query<userType, void>({
      query: () => "/auth/profile",
    }),
    updateProfile: builder.mutation<updateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/auth/profile/update/6",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUsersQuery,
  useUpdateProfileMutation,
} = authApi;
