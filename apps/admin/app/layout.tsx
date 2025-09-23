// apps/admin/app/layout.tsx
import "@/assets/styles/main.scss";

import AdminLayout from "@/layouts/AdminLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo",
  description: "Administração do Shopping WebApp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
