import { baseApi } from "./baseApi";
import { setUser, type AuthUser } from "../slices/authSlice";

export interface SignInPayload {
  username: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export type UserProfileResponse = AuthUser;

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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch {
          // Error autentikasi ditangani oleh dashboard layout.
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignOutMutation, useGetMeQuery } = authApi;
