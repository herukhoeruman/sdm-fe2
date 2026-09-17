import { baseApi } from "./baseApi";

export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  nama: string;
  jabatan: string;
  divisi: string;
  roles: string[];
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInPayload>({
      query: (body) => ({ url: "/api/auth/signin", method: "POST", body }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({ url: "/api/auth/signout", method: "DELETE" }),
      invalidatesTags: ["Me"],
    }),
    getMe: builder.query<UserProfileResponse, void>({
      query: () => "/api/auth/getme",
      providesTags: ["Me"],
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation, useGetMeQuery } = authApi;
