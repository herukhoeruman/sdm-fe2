import { baseApi } from "./baseApi";

export interface PersonRoleResponse {
  id: string;
  name: string;
}

export interface PersonResponse {
  id: string;
  nama: string;
  jabatan: string;
  username: string;
  email: string;
  divisi: string;
  nama_atasan: string;
  penilaian: boolean;
  roles: PersonRoleResponse[];
}

export interface PersonDetailResponse {
  id: number;
  nama: string;
  email: string;
  jabatan: string;
  divisi: string;
  parent: number;
}

export interface JawabanResponse {
  id: number;
  jawaban: string;
  level: number;
}

export interface PertanyaanResponse {
  id: number;
  jenis: string;
  kompetensi: string;
  pertanyaan: string;
  jawabanSet: JawabanResponse[];
}

export interface AnswerPayload {
  pertanyaanId: number;
  jawabanId: number;
  level: number;
}

export interface AssessmentPayload {
  idUser?: number;
  idPerson: number;
  emailUser?: string;
  emailPerson: string;
  parent: number;
  answers: AnswerPayload[];
}

export interface SubmitAnswersPayload {
  data: AssessmentPayload;
}

export interface SubmitAnswersResponse {
  message: string;
}

export const penilaianApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPersons: builder.query<PersonResponse[], string | number>({
      query: (userId) => `/api/data/person/${userId}`,
    }),
    getPersonById: builder.query<PersonDetailResponse, string | number>({
      query: (id) => `/api/data/personId/${id}`,
    }),
    getQuestions: builder.query<PertanyaanResponse[], void>({
      query: () => "/api/data/pertanyaan",
    }),
    submitAnswers: builder.mutation<SubmitAnswersResponse, SubmitAnswersPayload>({
      query: (body) => ({ url: "/api/data/jawaban", method: "POST", body }),
    }),
  }),
});

export const {
  useGetPersonsQuery,
  useGetPersonByIdQuery,
  useGetQuestionsQuery,
  useSubmitAnswersMutation,
} = penilaianApi;
