import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/providers";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { ReduxProviders } from "@/components/providers/redux-provider";
import { ModalPovider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistem Informasi Penilaian Kompetensi Individu",
  description: "PT. Gerbang Sinergi Prima",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            storageKey="sdm-theme"
          >
            <ToasterProvider />
            <ModalPovider />
            {children}
          </ThemeProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
