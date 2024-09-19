import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import signType from "@/types/SignUp";
import loginType from "@/types/SignIn";

interface RegisterResponse {
  userId: string;
  name: string;
  phone: string;
  email: string;
  cfpassword: string;
  token: string;
}
interface LoginResponse {
  userId: string;
  email: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, signType>({
      query: ({ name, phone, email, cfpassword, password }) => ({
        url: "/register",
        method: "POST",
        body: { name, phone, email, cfpassword, password },
      }),
    }),
    login: builder.mutation<LoginResponse, loginType>({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
