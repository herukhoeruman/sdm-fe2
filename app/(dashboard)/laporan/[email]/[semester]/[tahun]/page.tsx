"use client";

import React, { useRef } from "react";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getData } from "@/lib/fetcher";
import { Table, TableCell, TableBody, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

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

  const handleExportPDF = () => {
    const doc = new jsPDF();

    data.forEach((employee, employeeIndex) => {
      if (employeeIndex > 0) {
        doc.addPage();
      }

      // Add title
      doc.setFontSize(14);
      doc.text("Evaluasi Kompetensi", 14, 15);

      // Add employee details
      doc.setFontSize(10);
      doc.text(`Nama Karyawan : ${employee.namaKaryawan}`, 14, 25);
      doc.text(`Jabatan : ${employee.jabatan}`, 14, 30);
      doc.text(`Divisi : ${employee.divisi}`, 14, 35);

      // Helper function to create competency rows
      const createCompetencyRows = (competencies: any) => {
        return competencies.flatMap((comp: any, index: number) => [
          [index + 1, comp.nama, "", "", "", ""],
          [
            "",
            comp.deskripsi,
            comp.nilai === 1 ? "1" : "",
            comp.nilai === 2 ? "1" : "",
            comp.nilai === 3 ? "1" : "",
            comp.nilai === 4 ? "1" : "",
          ],
        ]);
      };

      // Create table data
      const tableData = [
        [
          { content: "Kompetensi Utama", colSpan: 2 },
          { content: "1", fontStyle: "bold" },
          "2",
          "3",
          "4",
        ],
        ...createCompetencyRows(employee.kompetensiUtama),
        [
          { content: "Kompetensi Peran", colSpan: 2 },
          { content: "1" },
          "2",
          "3",
          "4",
        ],
        ...createCompetencyRows(employee.kompetensiPeran),
        [
          "",
          "Jumlah",
          employee.jumlah.nilai1,
          employee.jumlah.nilai2,
          employee.jumlah.nilai3,
          employee.jumlah.nilai4,
        ],
        [
          "",
          "Nilai",
          employee.nilai.nilai1,
          employee.nilai.nilai2,
          employee.nilai.nilai3,
          employee.nilai.nilai4,
        ],
        [
          "",
          "Total Nilai",
          employee.totalNilai.nilai1,
          employee.totalNilai.nilai2,
          employee.totalNilai.nilai3,
          employee.totalNilai.nilai4,
        ],
        [
          "",
          "Nilai Rata-Rata",
          { content: employee.nilaiRataRata.toString(), colSpan: 4 },
        ],
      ];

      // Add table to document
      autoTable(doc, {
        startY: 40,
        head: [
          [
            { content: "No" },
            { content: "Kompetensi yang Dinilai" },
            { content: "Nilai Kompetensi", colSpan: 4 },
          ],
        ],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [200, 200, 200],
          textColor: [0, 0, 0],
          fontStyle: "bold",
          halign: "center",
        },
        columnStyles: {
          0: { cellWidth: 20, halign: "left", fontStyle: "bold" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto", halign: "center" },
          3: { cellWidth: "auto", halign: "center" },
          4: { cellWidth: "auto", halign: "center" },
          5: { cellWidth: "auto", halign: "center" },
        },
      });
    });

    // Save the PDF after all pages have been added
    doc.save("evaluasi_kompetensi.pdf");
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-medium">Evaluasi Kompetensi </p>
          <Button onClick={handleExportPDF} size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export to PDF
          </Button>
        </div>

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
                  {employee.kompetensiUtama.map((item, index) => (
                    <React.Fragment key={index}>
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
                    </React.Fragment>
                  ))}
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
                  {employee.kompetensiPeran.map((item, index) => (
                    <React.Fragment key={index}>
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
                    </React.Fragment>
                  ))}
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
    </ScrollArea>
  );
};

export default EmailPage;
