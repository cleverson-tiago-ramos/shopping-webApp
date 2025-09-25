// apps/admin/src/components/login/LoginForm.tsx
import React, { useState } from "react";
import { toast } from "sonner"; // 1. Importe a função 'toast'

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 2. Adicione a validação aqui
    if (!email || !password) {
      toast.error("Por favor, preencha o email e a senha.");
      return; // Para a execução para não tentar fazer o login
    }

    // Se a validação passar, você pode continuar com a lógica de login
    toast.success("Login enviado com sucesso!");
    console.log("Dados do formulário:", { email, password });
    // Aqui viria a chamada para sua API de login...
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email" className="login-form__label">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="login-form__input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
      />
      <div style={{ height: "1rem" }} /> {/* Espaçamento simples */}
      <label htmlFor="password" className="login-form__label">
        Senha
      </label>
      <input
        type="password"
        id="password"
        className="login-form__input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Sua senha"
      />
      <a href="#" className="login-form__forgot-password">
        Esqueceu a senha?
      </a>
      <button
        type="submit"
        className="login-form__button login-form__button--primary"
      >
        Fazer login
      </button>
    </form>
  );
};

export default LoginForm;
