// src/components/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-700">Imobiliária Admin</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Dashboard
          </Link>

          <Link
            to="/imoveis"
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Imóveis
          </Link>

          <Link
            to="/imoveis/criar"
            className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          >
            Criar Imóvel
          </Link>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTEÚDO */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </main>

        {/* RODAPÉ */}
        <footer className="border-t bg-white mt-6">
          <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Imobiliária — Painel Administrativo
          </div>
        </footer>
      </div>
    </div>
  );
}
