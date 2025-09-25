import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="page-footer">
      <div className="page-footer__links">
        <a href="#">Termos de Uso</a>
        <span>&bull;</span>
        <a href="#">Política de Privacidade</a>
      </div>
      <p className="page-footer__recaptcha">
        Este site é protegido por reCAPTCHA Enterprise. A{" "}
        <a href="#">Política de Privacidade</a> do Google e seus{" "}
        <a href="#">Termos de Serviço</a> são aplicáveis.
      </p>
      <p className="page-footer__copyright">
        App Vantage {currentYear} &copy; Todos os direitos reservados.
        Desenvolvido por Cleverson Ramos.
      </p>
    </footer>
  );
};

export default Footer;
