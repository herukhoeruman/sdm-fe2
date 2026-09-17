import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type StateWithAuth = { auth: { token: string | null } };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as StateWithAuth).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Me", "Pegawai", "Users", "Roles", "Process", "Kpi"],
  endpoints: () => ({}),
});
