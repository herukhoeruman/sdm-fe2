import { baseApi } from "./baseApi";

export interface SdmProcessResponse {
  email: string;
  tahun: string;
  semester: string;
  tanggal: string;
}

export interface GenerateSdmProcessPayload {
  tahun: string;
  semester: string;
  userId: number;
  tglJatuhTempo: Date;
}

export interface GenerateSdmProcessResponse {
  message: string;
}

export const sdmApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSdmProcesses: builder.query<SdmProcessResponse[], void>({
      query: () => "/api/data/sdmShowProsess",
      providesTags: ["Process"],
    }),
    generateSdmProcess: builder.mutation<
      GenerateSdmProcessResponse,
      GenerateSdmProcessPayload
    >({
      query: (body) => ({ url: "/api/data/sdmProsess", method: "PUT", body }),
      invalidatesTags: ["Process"],
    }),
  }),
});

export const { useGetSdmProcessesQuery, useGenerateSdmProcessMutation } = sdmApi;
