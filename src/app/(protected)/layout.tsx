import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Navbar from "@/components/shared/Navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  
  if (!token) {
    redirect("/signin");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
