import { baseApi } from "./baseApi";
import type { RoleResponse } from "./userApi";

export type PegawaiId = string | number;

export interface PegawaiResponse {
  roles?: (RoleResponse | string)[];
  id: number;
  email: string;
  password: string;
  username: string;
  parent: number;
  divisi: string;
  jabatan: string;
  nama: string;
  namaAtasan: string;
  penilaian: number;
  validasiSdm?: number;
}

export interface PegawaiPayload {
  nama: string;
  email: string;
  password: string;
  username: string;
  parent: number;
  divisi: string;
  jabatan: string;
  namaAtasan: string;
  penilaian: number;
  validasiSdm: number;
}

export interface UpdatePegawaiPayload {
  id: PegawaiId;
  body: Omit<PegawaiPayload, "password"> & { password?: string };
}

export const pegawaiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPegawai: builder.query<PegawaiResponse[], void>({
      query: () => "/api/pegawai",
      providesTags: ["Pegawai"],
    }),
    getPegawaiById: builder.query<PegawaiResponse, PegawaiId>({
      query: (id) => `/api/pegawai/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Pegawai", id }],
    }),
    createPegawai: builder.mutation<PegawaiResponse, PegawaiPayload>({
      query: (body) => ({ url: "/api/pegawai", method: "POST", body }),
      invalidatesTags: ["Pegawai"],
    }),
    updatePegawai: builder.mutation<PegawaiResponse, UpdatePegawaiPayload>({
      query: ({ id, body }) => ({ url: `/api/pegawai/${id}`, method: "PUT", body }),
      invalidatesTags: ["Pegawai", "Me", "Users"],
    }),
    deletePegawai: builder.mutation<void, PegawaiId>({
      query: (id) => ({ url: `/api/pegawai/${id}`, method: "DELETE" }),
      invalidatesTags: ["Pegawai"],
    }),
  }),
});

export const {
  useGetPegawaiQuery,
  useGetPegawaiByIdQuery,
  useCreatePegawaiMutation,
  useUpdatePegawaiMutation,
  useDeletePegawaiMutation,
} = pegawaiApi;
