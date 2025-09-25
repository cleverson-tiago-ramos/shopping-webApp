// apps/admin/src/components/login/LoginForm.tsx
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Continuar com o email:", email);
    // Próximo passo seria mostrar o campo de senha ou enviar um link mágico
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
        required
      />
      <a href="#" className="login-form__forgot-password">
        Esqueceu o email?
      </a>
      <button type="submit" className="login-form__button">
        Continuar com email
      </button>
    </form>
  );
};

export default LoginForm;
