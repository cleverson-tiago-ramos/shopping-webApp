// apps/admin/src/components/socialLogin/SocialLogin.tsx
import React from "react";

// Ícones SVG
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48">
    <path
      fill="#EA4335"
      d="M24 9.5c3.13 0 5.9 1.08 7.95 2.9l6.35-6.35C34.65 2.35 29.7 0 24 0 14.5 0 6.5 5.5 2.95 13.45l7.5 5.85C12.2 13.9 17.6 9.5 24 9.5z"
    ></path>
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.65-.15-3.25-.4-4.8H24v9h12.7c-.55 3-2.2 5.55-4.8 7.35l7.45 5.75C43.95 38.3 46.5 31.95 46.5 24.5z"
    ></path>
    <path
      fill="#34A853"
      d="M10.45 29.3c-1.3-3.9-1.3-8.3 0-12.2L2.95 13.45C-1 21.3-1 30.7 2.95 38.55l7.5-5.85z"
    ></path>
    <path
      fill="#FBBC05"
      d="M24 48c5.7 0 10.65-1.9 14.2-5.15l-7.45-5.75c-2.25 1.5-5.1 2.4-8.15 2.4-6.4 0-11.8-4.4-13.45-10.3L2.95 34.55C6.5 42.5 14.5 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);
const FacebookIcon = () => (
  <svg fill="#ffffff" viewBox="0 0 16 16">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v2.22h-1.308c-.983 0-1.303.621-1.303 1.258v1.51h2.454l-.412 2.378H9.982v5.625c3.828-.604 6.75-3.934 6.75-7.951z" />
  </svg>
);
const AppleIcon = () => (
  <svg fill="#ffffff" viewBox="0 0 16 16">
    <path d="M11.182.008C10.158 0 9.09.523 8.164 1.34c-.926-.817-2.055-1.34-3.018-1.34-1.205 0-2.39.72-3.234 1.95C.958 3.324 1.344 5.613 2.65 7.64c.891 1.387 1.928 2.822 3.298 2.822 1.403 0 2.227-1.255 3.125-1.255.898 0 1.638 1.255 3.018 1.255 1.44 0 2.406-1.474 3.262-2.822.868-1.353 1.83-4.228 1.01-6.103C13.48 .765 12.394.008 11.182.008M8.165 2.14c.854-.03 1.943.682 1.943 1.897 0 1.32-.983 1.944-1.943 1.944-.93 0-1.943-.652-1.943-1.916 0-1.235.983-1.897 1.943-1.925" />
  </svg>
);

const SocialLogin = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Iniciando login com ${provider}`);
  };

  return (
    <div className="social-login">
      <button
        className="social-login__button social-login__button--google"
        onClick={() => handleSocialLogin("google")}
      >
        <GoogleIcon />
        Continuar com Google
      </button>
      <button
        className="social-login__button social-login__button--facebook"
        onClick={() => handleSocialLogin("facebook")}
      >
        <FacebookIcon />
        Continuar com Facebook
      </button>
      <button
        className="social-login__button social-login__button--apple"
        onClick={() => handleSocialLogin("apple")}
      >
        <AppleIcon />
        Continuar com Apple
      </button>
      <a href="#" className="social-login__sso-link">
        Continuar com SSO
      </a>
    </div>
  );
};

export default SocialLogin;
