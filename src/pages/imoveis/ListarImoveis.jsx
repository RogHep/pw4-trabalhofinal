// src/pages/imoveis/ListarImoveis.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listarImoveis, deletarImovel } from "../../services/imovelService";

export default function ListarImoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await listarImoveis();
        setImoveis(data || []);
      } catch (err) {
        console.error("Erro listar imóveis:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Confirma exclusão deste imóvel?")) return;
    try {
      await deletarImovel(id);
      setImoveis(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir imóvel.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Imóveis</h1>
        <div className="flex gap-2">
          <Link to="/imoveis/criar" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Novo</Link>
          <button onClick={() => navigate(0)} className="px-3 py-2 border rounded">Atualizar</button>
        </div>
      </div>

      {loading ? (
        <div className="text-gray-600">Carregando...</div>
      ) : imoveis.length === 0 ? (
        <div className="text-gray-600">Nenhum imóvel cadastrado.</div>
      ) : (
        <div className="space-y-4">
          {imoveis.map(imovel => (
            <div key={imovel.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              
              {/* DADOS DO IMÓVEL */}
              <div>
                <div className="font-medium text-gray-800">
                  {imovel.titulo || `#${imovel.id}`}
                </div>
                <div className="text-sm text-gray-600">
                  {imovel.endereco || ""} {imovel.numero ? `, ${imovel.numero}` : ""}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  {imovel.precoVenda ? `R$ ${Number(imovel.precoVenda).toFixed(2)}` : ""}
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex items-center gap-2">
                <Link to={`/imoveis/${imovel.id}`} className="px-3 py-1 border rounded text-sm">Ver</Link>

                <Link to={`/imoveis/${imovel.id}/editar`} className="px-3 py-1 border rounded text-sm">
                  Editar
                </Link>

                {/* ➕ AQUI ESTÁ O BOTÃO GERENCIAR FOTOS */}
                <Link to={`/imoveis/${imovel.id}/fotos`} className="px-3 py-1 border rounded text-sm text-indigo-600">
                  Gerenciar Fotos
                </Link>

                <button
                  onClick={() => handleDelete(imovel.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
