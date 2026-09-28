import { baseApi } from "./baseApi";

export type KpiLevel = "STAFF" | "VP" | "MANAGER" | "BOD" | "COMPANY";

export interface KpiDefinitionPayload {
  id?: number;
  name: string;
  description: string;
  unit: string;
  parentKpiId: number | null;
  ownerId: number;
  weight: number;
  cascadeRatio: number;
  tahun: number;
  level: KpiLevel;
  kpiCode: string;
}

export interface KpiDefinitionResponse extends KpiDefinitionPayload {
  id?: number;
  message?: string;
}

export interface KpiDefinitionTree {
  id: number;
  name: string;
  description: string;
  level: KpiLevel;
  status: string;
  tahun: number;
  unit: string;
  weight: number;
  cascadeRatio: number;
  ownerId: number;
  ownerName: string;
  parentKpiId: number | null;
  children: KpiDefinitionTree[];
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
    getKpiDefinitions: builder.query<
      KpiDefinitionPayload[],
      { ownerId: number; tahun: number }
    >({
      query: (params) => ({
        url: `/api/kpi/definition?ownerId=${params.ownerId}&tahun=${params.tahun}`,
        method: "GET",
      }),
      providesTags: ["Kpi"],
    }),
    getKpiDefinitionTree: builder.query<KpiDefinitionTree[], number>({
      query: (tahun) => ({
        url: `/api/kpi/definition/tree?tahun=${tahun}`,
        method: "GET",
      }),
      providesTags: ["Kpi"],
    }),
  }),
});

export const {
  useCreateKpiDefinitionMutation,
  useGetKpiDefinitionsQuery,
  useGetKpiDefinitionTreeQuery,
} = kpiApi;
