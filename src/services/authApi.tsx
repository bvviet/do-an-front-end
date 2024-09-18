import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import signType from "@/types/SignUp";

interface RegisterResponse {
  userId: string;
  name: string;
  email: string;
  token: string;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, signType>({
      query: ({ name, email, password }) => ({
        url: "/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
