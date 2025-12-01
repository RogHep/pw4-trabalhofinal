// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="flex justify-between items-center px-6 h-16">

        {/* --- LADO ESQUERDO (Título com link) --- */}
        <div className="flex items-center gap-3">

          {/* Ícone mobile para abrir sidebar */}
          <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>

          {/* Título clicável para voltar ao dashboard */}
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition tracking-wide"
          >
            Imobiliária Admin
          </Link>
        </div>

        {/* --- LADO DIREITO (Usuário + sair) --- */}
        <div className="flex items-center gap-6">

          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-sm font-medium text-gray-700">Olá, Admin</span>
            <span className="text-xs text-gray-500">Administrador</span>
          </div>

          <div className="hidden sm:block w-9 h-9 rounded-full bg-gray-200 border border-gray-300"></div>

          <button
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sair
          </button>

        </div>

      </div>
    </header>
  );
}
