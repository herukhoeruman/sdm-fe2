// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type StateWithAuth = { auth: { token: string | null } };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API,
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as StateWithAuth).auth.token;
//       if (token) headers.set("authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ["Me", "Pegawai", "Users", "Roles", "Process", "Kpi"],
//   endpoints: () => ({}),
// });

import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearToken } from "@/lib/redux/slices/authSlice";

type StateWithAuth = { auth: { token: string | null } };

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as StateWithAuth).auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const hadToken = !!(api.getState() as StateWithAuth).auth.token;

    // Hanya logout jika memang sedang login, supaya tidak loop
    // saat request login sendiri gagal dengan 401 (kredensial salah)
    if (hadToken) {
      api.dispatch(clearToken());
      api.dispatch(baseApi.util.resetApiState());

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Me", "Pegawai", "Users", "Roles", "Process", "Kpi"],
  endpoints: () => ({}),
});
