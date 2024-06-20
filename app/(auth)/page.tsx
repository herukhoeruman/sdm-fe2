import { Metadata } from "next";
import UserAuthForm from "./_components/user-auth-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0">
          <Image
            src="/bg-2.jpg"
            width={900}
            height={1125}
            alt="background"
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 dark:from-black/50" />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/logo.png" width={100} height={63} alt="logo" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Sistem Informasi Penilaian Kompetensi Individu
            </p>
            <footer className="text-sm">PT. Gerbang Sinergi Prima</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Masukan email anda untuk login
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Silahkan hubungi admin untuk mendapatkan akses.
          </p>
        </div>
      </div>
    </div>
  );
}
