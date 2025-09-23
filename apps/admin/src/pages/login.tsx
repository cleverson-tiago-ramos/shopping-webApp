// apps/admin/src/pages/login.tsx
import Head from "next/head";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Painel Admin</title>
      </Head>
      <main className="login-page">
        <div className="login-container">
          <h1>Entrar no Painel</h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
