export type DashboardRole = "pegawai" | "sdm" | "admin";

export const samplePeriod = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const dashboardSamples = {
  pegawai: {
    label: "Pegawai",
    description:
      "Pantau tugas penilaian dan perkembangan KPI Anda dalam satu tempat.",
    metrics: [
      { label: "Tugas Penilaian", value: "8", detail: "Periode berjalan" },
      {
        label: "Belum Dikerjakan",
        value: "3",
        detail: "Perlu ditindaklanjuti",
      },
      { label: "Sudah Selesai", value: "5", detail: "Dari 8 tugas penilaian" },
      { label: "KPI Saya", value: "6", detail: "Indikator periode berjalan" },
    ],
    tasks: [
      {
        title: "Penilaian rekan satu tim",
        description: "2 pegawai belum dinilai",
        date: "15 Okt 2026",
        status: "Prioritas",
        href: "/penilaian",
        action: "Lihat Penilaian",
      },
      {
        title: "Penilaian atasan",
        description: "1 penilaian belum dikerjakan",
        date: "20 Okt 2026",
        status: "Menunggu",
        href: "/penilaian",
        action: "Lihat Penilaian",
      },
      {
        title: "Tinjau KPI periode berjalan",
        description: "Periksa 6 indikator kinerja Anda",
        date: "31 Okt 2026",
        status: "Menunggu",
        href: "/kpi/pegawai",
        action: "Lihat KPI",
      },
    ],
    progress: [{ label: "Penilaian Saya", completed: 5, total: 8 }],
    links: [
      {
        title: "Penilaian",
        description: "Kerjakan tugas penilaian",
        href: "/penilaian",
      },
      {
        title: "KPI Saya",
        description: "Lihat indikator kinerja",
        href: "/kpi/pegawai",
      },
    ],
  },
  sdm: {
    label: "SDM",
    description:
      "Pantau progres penilaian perusahaan dan tindak lanjut setiap divisi.",
    metrics: [
      {
        label: "Total Pegawai",
        value: "120",
        detail: "Dalam periode penilaian",
      },
      { label: "Belum Dinilai", value: "36", detail: "30% dari total pegawai" },
      { label: "Sudah Dinilai", value: "84", detail: "70% dari total pegawai" },
      {
        label: "KPI Perusahaan",
        value: "24",
        detail: "Indikator periode berjalan",
      },
    ],
    tasks: [
      {
        title: "Tinjau penilaian yang tertunda",
        description: "36 pegawai belum selesai dinilai",
        date: "15 Okt 2026",
        status: "Prioritas",
        href: "/penilaian",
        action: "Lihat Penilaian",
      },
      {
        title: "Periksa periode generate penilai",
        description: "Pastikan periode dan jatuh tempo sesuai",
        date: "20 Okt 2026",
        status: "Menunggu",
        href: "/generator",
        action: "Lihat Periode",
      },
      {
        title: "Tinjau laporan penilaian",
        description: "84 pegawai sudah selesai dinilai",
        date: "31 Okt 2026",
        status: "Menunggu",
        href: "/laporan",
        action: "Lihat Laporan",
      },
    ],
    progress: [
      { label: "Operasional", completed: 32, total: 40 },
      { label: "Teknologi", completed: 24, total: 30 },
      { label: "Keuangan", completed: 16, total: 25 },
      { label: "SDM & Umum", completed: 12, total: 25 },
    ],
    links: [
      {
        title: "Generate Penilai",
        description: "Atur periode penilaian",
        href: "/generator",
      },
      {
        title: "Laporan",
        description: "Lihat hasil penilaian",
        href: "/laporan",
      },
      {
        title: "Data Pegawai",
        description: "Kelola informasi pegawai",
        href: "/pegawai",
      },
      {
        title: "KPI SDM",
        description: "Tinjau hierarki KPI",
        href: "/kpi/sdm",
      },
    ],
  },
  admin: {
    label: "Admin",
    description: "Pantau akun pengguna dan kelola peran akses aplikasi.",
    metrics: [
      { label: "Total Users", value: "128", detail: "Akun pengguna terdaftar" },
      {
        label: "Role Pegawai",
        value: "120",
        detail: "Akun dengan akses pegawai",
      },
      { label: "Role SDM", value: "6", detail: "Akun dengan akses SDM" },
      { label: "Role Admin", value: "2", detail: "Akun dengan akses admin" },
    ],
    tasks: [
      {
        title: "Tinjau akses pengguna baru",
        description: "4 akun sample perlu peninjauan peran",
        date: "05 Okt 2026",
        status: "Prioritas",
        href: "/users",
        action: "Kelola Users",
      },
      {
        title: "Tinjau peran administrator",
        description: "Periksa hak akses 2 akun admin",
        date: "10 Okt 2026",
        status: "Menunggu",
        href: "/users",
        action: "Tinjau Akses",
      },
    ],
    progress: [
      { label: "Pegawai", completed: 120, total: 128 },
      { label: "SDM", completed: 6, total: 128 },
      { label: "Admin", completed: 2, total: 128 },
    ],
    links: [
      {
        title: "Kelola Users",
        description: "Periksa akun dan peran akses",
        href: "/users",
      },
    ],
  },
};
