import React from "react";

// Nota: As importações de 'next/image' e do ficheiro do logótipo foram removidas.
// Para este código funcionar, por favor, mova o seu ficheiro 'logo.png'
// para a pasta 'public' na raiz do seu projeto 'admin'.
// O caminho final deverá ser: 'apps/admin/public/logo.png'

const Header = () => {
  return (
    <header className="page-header">
      {/* Alterado do componente 'Image' do Next.js para uma tag 'img' padrão
        para resolver um problema de compilação. O 'src' agora aponta
        diretamente para a pasta 'public'.
      */}
      <img
        src="/img/logo.png"
        alt="Vantage App Logo"
        width={180}
        className="page-header__logo"
      />
      <h1 className="page-header__title">Bem-vindo de volta!</h1>
    </header>
  );
};

export default Header;
