// apps/admin/src/pages/index.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import LoginForm from "../components/login/LoginForm";
import SocialLogin from "../components/socialLogin/SocialLogin";

const LoginPage = () => {
  // Estado para controlar a etapa do login ('email' ou 'password')
  const [loginStep, setLoginStep] = useState<"email" | "password">("email");
  // Estado para guardar o email após a primeira etapa
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Função chamada quando o formulário de email é enviado
  const handleEmailSubmit = (email: string) => {
    // Aqui você poderia validar o email ou verificar se ele existe no DB
    console.log("Email recebido:", email);
    setSubmittedEmail(email);
    setLoginStep("password"); // Muda para a etapa de senha
  };

  // Função chamada quando o formulário de senha é enviado
  const handleFinalSubmit = (password: string) => {
    console.log("Tentativa de login final com:", {
      email: submittedEmail,
      password: password,
    });
    // Lógica final de autenticação com a API
    toast.success("Login efetuado com sucesso!");
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>Login</h1>
        <p>
          Ainda não tem uma conta? <a href="#">Registre-se</a>
        </p>
      </header>

      <main className="login-card">
        <div className="login-card__column">
          <LoginForm
            loginStep={loginStep}
            onEmailSubmit={handleEmailSubmit}
            submittedEmail={submittedEmail}
            onFinalSubmit={handleFinalSubmit}
          />
        </div>

        <div className="login-divider">
          <span>ou</span>
        </div>

        <div className="login-card__column">
          <SocialLogin />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
