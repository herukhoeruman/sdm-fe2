import { baseApi } from "./baseApi";

export interface EmployeeSumResponse {
  email: string;
  divisi: string;
  jabatan: string;
  tahun: string;
  semester: string;
  levelSum: number;
}

export interface KompetensiResponse {
  nama: string;
  deskripsi: string;
  nilai: number;
}

export interface NilaiDetailResponse {
  nilai4: number;
  nilai3: number;
  nilai2: number;
  nilai1: number;
}

export interface EmployeeDetailResponse {
  namaKaryawan: string;
  jabatan: string;
  divisi: string;
  kompetensiUtama: KompetensiResponse[];
  kompetensiPeran: KompetensiResponse[];
  jumlah: NilaiDetailResponse;
  nilai: NilaiDetailResponse;
  totalNilai: NilaiDetailResponse;
  nilaiRataRata: number;
}

export interface EmployeeDetailParams {
  email: string;
  tahun: string;
  semester: string;
}

export const laporanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeSum: builder.query<EmployeeSumResponse[], void>({
      query: () => "/api/data/employeesum",
    }),
    getEmployeeDetail: builder.query<
      EmployeeDetailResponse[],
      EmployeeDetailParams
    >({
      query: (params) => ({ url: "/api/data/employeedetail", params }),
    }),
  }),
});

export const { useGetEmployeeSumQuery, useGetEmployeeDetailQuery } = laporanApi;
