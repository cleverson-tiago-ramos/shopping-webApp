"use client";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Painel Admin</h2>
      <nav>
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Usuários</a>
          </li>
          <li>
            <a href="#">Configurações</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
