"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    if (token) {
      redirect("/dashboard");
    }
  }, [token]);

  return <>{children}</>;
};

export default AuthLayout;
