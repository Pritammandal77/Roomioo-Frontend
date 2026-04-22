import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/shared/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
