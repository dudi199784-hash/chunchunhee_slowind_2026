import type { Metadata } from "next";
import AdminComponent from "./AdminComponent";

export const metadata: Metadata = {
  title: "Admin",
  description: "관리자",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>— admin layout —</p>
      <AdminComponent />
      <hr />
      {children}
    </div>
  );
}
