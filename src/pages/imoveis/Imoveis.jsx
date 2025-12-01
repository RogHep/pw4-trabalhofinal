import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarImoveis, excluirImovel } from "../../services/imovelService";

export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const dados = await listarImoveis();
    setImoveis(dados);
  }

  async function remover(id) {
    if (!window.confirm("Deseja realmente excluir este imóvel?")) return;

    const ok = await excluirImovel(id);
    if (ok) {
      alert("Imóvel excluído com sucesso!");
      carregar();
    }
  }

  return (
    <div className="space-y-6">

      {/* TÍTULO + BOTÃO NOVO */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Imóveis</h1>

        <Link
          to="/imoveis/criar"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Novo Imóvel
        </Link>
      </div>

      {/* LISTAGEM COMO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {imoveis.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm rounded-lg p-5 border flex flex-col justify-between"
          >
            {/* TÍTULO */}
            <h2 className="text-xl font-semibold text-gray-800">
              {item.titulo}
            </h2>

            {/* ENDEREÇO */}
            <p className="text-gray-600 mt-1">
              {item.endereco} , {item.numero}
            </p>

            {/* PREÇO */}
            <p className="text-lg font-medium text-indigo-600 mt-3">
              R$ {item.precoVenda?.toLocaleString("pt-BR")}
            </p>

            {/* AÇÕES */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to={`/imoveis/${item.id}`}
                className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Ver
              </Link>

              <Link
                to={`/imoveis/editar/${item.id}`}
                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Editar
              </Link>

              <Link
                to={`/imoveis/${item.id}/fotos`}
                className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Fotos
              </Link>

              <button
                onClick={() => remover(item.id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
