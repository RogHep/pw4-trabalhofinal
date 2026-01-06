import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const admin = localStorage.getItem("admin");
  const corretor = localStorage.getItem("corretor");

  let titulo = "Imobiliária";
  let usuarioNome = "Corretor";

  if (admin) {
    titulo = "Imobiliária Admin";
    usuarioNome = "Administrador";
  }

  function sair() {
    localStorage.removeItem("admin");
    localStorage.removeItem("corretor");
    navigate("/login");
  }

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="flex justify-between items-center px-6 h-16">

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 hover:text-indigo-700 tracking-wide"
          >
            {titulo}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-sm font-medium text-gray-700">Olá!</span>
            <span className="text-xs text-gray-500">{usuarioNome}</span>
          </div>

          <div className="hidden sm:block w-9 h-9 rounded-full bg-gray-200 border border-gray-300"></div>

          <button
            onClick={sair}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Só o admin pode cadastrar corretores */}
      {admin && (
        <div className="px-6 py-3 border-t bg-gray-50">
          <Link
            to="/corretores/criar"
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Cadastrar Corretor
          </Link>
        </div>
      )}
    </header>
  );
}
