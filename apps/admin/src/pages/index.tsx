// apps/admin/src/pages/index.tsx

import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout";
import SeoHead from "../components/Head/SeoHead";

export default function HomePage() {
  return (
    <>
      <SeoHead
        title="Painel de Login"
        description="Acesse o painel de administração da Vantage App."
      />

      <AdminLayout>
        <main className="admin-dashboard">
          <h1>Bem-vindo ao Painel Administrativo</h1>
          <p>Gerencie suas informações aqui.</p>
        </main>
      </AdminLayout>
    </>
  );
}
