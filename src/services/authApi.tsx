import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import signType from "@/types/SignUp";
import loginType from "@/types/SignIn";
import { userType } from "@/types/user";

interface RegisterResponse {
  userId: string;
  name: string;
  phone: string;
  email: string;
  token: string;
}
interface LoginResponse {
  userId: string;
  email: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (header, { getState }) => {
      const state = getState() as RootState;
      const token = state?.auth?.access_token;
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, signType>({
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
    getUsers: builder.query<userType[], void>({
      query: () => "/auth/profile",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetUsersQuery } =
  authApi;
