import { baseApi } from "./baseApi";

export interface CreateStorePayload {
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

export interface CreateStoreResponse {
  id: string | number;
}

export const storeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation<CreateStoreResponse, CreateStorePayload>({
      query: (body) => ({
        url:
          typeof window === "undefined"
            ? "/api/stores"
            : `${window.location.origin}/api/stores`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateStoreMutation } = storeApi;
