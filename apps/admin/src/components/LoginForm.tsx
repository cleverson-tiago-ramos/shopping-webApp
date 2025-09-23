"use client";
import { useState } from "react";
import useToast from "@/hooks/Toast/useToast";

export default function LoginForm() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de login
    if (email === "admin@example.com" && password === "123456") {
      showToast("Login realizado com sucesso!", "success");
    } else {
      showToast("Credenciais inválidas", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>
    </form>
  );
}
