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
    <div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

  <div className="flex gap-2">
    <Link 
      to="/imoveis"
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
    >
      Gerenciar Imóveis
    </Link>

    <Link 
      to="/imoveis/criar"
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Novo Imóvel
    </Link>
  </div>
</div>

  );
}
