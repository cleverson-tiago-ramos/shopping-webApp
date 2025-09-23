// apps/admin/src/pages/index.tsx

import Head from "next/head";
import AdminLayout from "@/layouts/AdminLayout";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Painel Administrativo</title>
        <meta name="description" content="Administração do Shopping WebApp" />
      </Head>

      <AdminLayout>
        <main className="admin-dashboard">
          <h1>Bem-vindo ao Painel Administrativo</h1>
          <p>Gerencie suas informações aqui.</p>
        </main>
      </AdminLayout>
    </>
  );
}
