import { baseApi } from "./baseApi";

export type KpiLevel = "STAFF" | "VP" | "MANAGER" | "BOD" | "COMPANY";

export interface KpiDefinitionPayload {
  name: string;
  description: string;
  unit: string;
  parentKpiId: number | null;
  ownerId: number;
  weight: number;
  cascadeRatio: number;
  tahun: number;
  level: KpiLevel;
}

export interface KpiDefinitionResponse extends KpiDefinitionPayload {
  id?: number;
  message?: string;
}

export const kpiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createKpiDefinition: builder.mutation<
      KpiDefinitionResponse,
      KpiDefinitionPayload
    >({
      query: (body) => ({
        url: "/api/kpi/definition",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Kpi"],
    }),
  }),
});

export const { useCreateKpiDefinitionMutation } = kpiApi;
