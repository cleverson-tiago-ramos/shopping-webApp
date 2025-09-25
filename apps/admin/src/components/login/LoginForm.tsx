// apps/admin/src/components/login/LoginForm.tsx
import React, { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  loginStep: "email" | "password";
  onEmailSubmit: (email: string) => void;
  submittedEmail: string;
  onFinalSubmit: (password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginStep,
  onEmailSubmit,
  submittedEmail,
  onFinalSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 1. Novo estado para controlar os erros dos campos
  const [errors, setErrors] = useState({ email: false, password: false });

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, digite seu email.");
      // 2. Adiciona o erro de email se o campo estiver vazio
      setErrors({ ...errors, email: true });
      return;
    }
    onEmailSubmit(email);
  };

  const handleFinalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      toast.error("Por favor, digite sua senha.");
      // 3. Adiciona o erro de senha se o campo estiver vazio
      setErrors({ ...errors, password: true });
      return;
    }
    onFinalSubmit(password);
  };

  // 4. Funções para limpar o erro quando o usuário começa a digitar
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.email) {
      setErrors({ ...errors, email: false });
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.password) {
      setErrors({ ...errors, password: false });
    }
    setPassword(e.target.value);
  };

  if (loginStep === "email") {
    return (
      <form className="login-form" onSubmit={handleInitialSubmit}>
        <label htmlFor="email" className="login-form__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          // 5. Adiciona a classe de erro condicionalmente
          className={`login-form__input ${errors.email ? "is-invalid" : ""}`}
          value={email}
          onChange={handleEmailChange}
          placeholder="seu@email.com"
        />
        <a href="#" className="login-form__forgot-password">
          Esqueceu o email?
        </a>
        <button type="submit" className="login-form__button">
          Continuar com email
        </button>
      </form>
    );
  }

  return (
    <form className="login-form" onSubmit={handleFinalSubmit}>
      <div className="login-form__display-email">
        <span>{submittedEmail}</span>
      </div>

      <label htmlFor="password" className="login-form__label">
        Senha
      </label>
      <div className="login-form__password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className={`login-form__input ${errors.password ? "is-invalid" : ""}`}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Sua senha"
          autoFocus
        />
        <button
          type="button"
          className="login-form__toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

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
