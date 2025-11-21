// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [counts, setCounts] = useState({ imoveis: 0, tipos: 0, bairros: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [imoveisRes, tiposRes, bairrosRes] = await Promise.all([
          api.get("/imoveis"),
          api.get("/tiposimoveis"),
          api.get("/bairros"),
        ]);
        setCounts({
          imoveis: Array.isArray(imoveisRes.data) ? imoveisRes.data.length : 0,
          tipos: Array.isArray(tiposRes.data) ? tiposRes.data.length : 0,
          bairros: Array.isArray(bairrosRes.data) ? bairrosRes.data.length : 0,
        });
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <Link to="/imoveis/criar" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Novo Imóvel
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-5 shadow">
          <div className="text-sm text-gray-500">Imóveis</div>
          <div className="mt-2 text-2xl font-bold text-gray-800">{counts.imoveis}</div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <div className="text-sm text-gray-500">Tipos de Imóvel</div>
          <div className="mt-2 text-2xl font-bold text-gray-800">{counts.tipos}</div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <div className="text-sm text-gray-500">Bairros</div>
          <div className="mt-2 text-2xl font-bold text-gray-800">{counts.bairros}</div>
        </div>
      </div>
    </div>
  );
}
