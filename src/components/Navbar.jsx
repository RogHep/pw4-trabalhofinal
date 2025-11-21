// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-indigo-600">Imobiliaria Admin</Link>
            <nav className="hidden md:flex gap-4 text-gray-600">
              <Link to="/" className="hover:text-indigo-600">Dashboard</Link>
              <Link to="/imoveis" className="hover:text-indigo-600">Imóveis</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-gray-600">Olá, Admin</div>
            <button className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Sair</button>
          </div>
        </div>
      </div>
    </header>
  );
}
