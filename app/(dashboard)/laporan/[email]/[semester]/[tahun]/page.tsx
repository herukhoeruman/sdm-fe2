"use client";

import React from "react";
import { useEffect, useState } from "react";

import { getData } from "@/lib/fetcher";
import { Table, TableCell, TableBody, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface EmployeeDetail {
  namaKaryawan: string;
  jabatan: string;
  divisi: string;
  kompetensiUtama: Kompetensi[];
  kompetensiPeran: Kompetensi[];
  jumlah: NilaiDetail;
  nilai: NilaiDetail;
  totalNilai: NilaiDetail;
  nilaiRataRata: number;
}

export interface Kompetensi {
  nama: string;
  deskripsi: string;
  nilai: number;
}

export interface NilaiDetail {
  nilai4: number;
  nilai3: number;
  nilai2: number;
  nilai1: number;
}

const EmailPage = ({
  params,
}: {
  params: { email: string; semester: string; tahun: string };
}) => {
  const [data, setData] = useState<EmployeeDetail[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(params);
        const response = await getData(
          `/api/data/employeedetail?email=${params.email}&tahun=${params.tahun}&semester=${params.semester}`
        );
        setData(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <p className="text-2xl font-medium">Evaluasi Kompetensi </p>

        {data.map((employee, index) => (
          <div className="my-10" key={index}>
            <table className="my-4 text-sm font-bold">
              <tbody>
                <tr>
                  <td>Nama Karyawan</td>
                  <td> &nbsp; : &nbsp;</td>
                  <td>{employee.namaKaryawan}</td>
                </tr>
                <tr>
                  <td>Jabatan</td>
                  <td> &nbsp; : &nbsp;</td>
                  <td>{employee.jabatan}</td>
                </tr>
                <tr>
                  <td>Divisi</td>
                  <td> &nbsp; : &nbsp;</td>
                  <td>{employee.divisi}</td>
                </tr>
              </tbody>
            </table>
            <div className="border rounded-md">
              <Table>
                <TableBody>
                  <TableRow className="bg-zinc-100 dark:bg-zinc-900">
                    <TableCell className="border font-bold w-[50px] text-center">
                      No
                    </TableCell>
                    <TableCell className="border font-bold text-center">
                      Kompetensi yang Dinilai
                    </TableCell>
                    <TableCell
                      className="border font-bold w-[200px] text-center"
                      colSpan={4}
                    >
                      Nilai Kompetensi
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow className="bg-zinc-100 dark:bg-zinc-900">
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">
                      Kompetensi Utama
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      1
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      2
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      3
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      4
                    </TableCell>
                  </TableRow>
                </TableBody>
                {employee.kompetensiUtama.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border text-muted-foreground font-bold">
                          {item.nama}
                        </TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border">
                          {item.deskripsi}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 1 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 2 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 3 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 4 ? "✔️" : ""}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </React.Fragment>
                ))}
                <TableBody>
                  <TableRow className="bg-zinc-100 dark:bg-zinc-900">
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">
                      Kompetensi Peran
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      1
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      2
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      3
                    </TableCell>
                    <TableCell className="w-[50px] text-center border font-bold">
                      4
                    </TableCell>
                  </TableRow>
                </TableBody>
                {employee.kompetensiPeran.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border text-muted-foreground font-bold">
                          {item.nama}
                        </TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border"></TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border"></TableCell>
                        <TableCell className="border">
                          {item.deskripsi}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 1 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 2 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 3 ? "✔️" : ""}
                        </TableCell>
                        <TableCell className="border">
                          {item.nilai === 4 ? "✔️" : ""}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </React.Fragment>
                ))}
                <TableBody>
                  <TableRow>
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">Jumlah</TableCell>
                    <TableCell className="border text-center">
                      {employee.jumlah.nilai1}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.jumlah.nilai2}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.jumlah.nilai3}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.jumlah.nilai4}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">Nilai</TableCell>
                    <TableCell className="border text-center">
                      {employee.nilai.nilai1}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.nilai.nilai2}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.nilai.nilai3}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.nilai.nilai4}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">
                      Total Nilai
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.totalNilai.nilai1}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.totalNilai.nilai2}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.totalNilai.nilai3}
                    </TableCell>
                    <TableCell className="border text-center">
                      {employee.totalNilai.nilai4}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className="border"></TableCell>
                    <TableCell className="border font-bold">
                      Nilai Rata-Rata
                    </TableCell>
                    <TableCell className="border text-center" colSpan={4}>
                      {employee.nilaiRataRata}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
      {/* ))} */}
    </ScrollArea>
  );
};

export default EmailPage;
