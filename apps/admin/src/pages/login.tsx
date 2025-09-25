// apps/admin/src/pages/index.tsx
import React from "react";
import LoginForm from "../components/login/LoginForm";
import SocialLogin from "../components/socialLogin/SocialLogin";

const LoginPage = () => {
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
          <LoginForm />
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
