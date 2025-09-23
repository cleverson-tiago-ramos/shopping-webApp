"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

import "@/styles/layout/_admin-layout.scss";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Topbar />
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
