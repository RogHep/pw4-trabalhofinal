// src/pages/imoveis/ListarImoveis.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function ListarImoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [bairroSelecionado, setBairroSelecionado] = useState("");

  // Carregar imóveis
  async function carregarImoveis() {
    const resp = await api.get("/imoveis");
    setImoveis(resp.data);
  }

  // Carregar bairros
  async function carregarBairros() {
    const resp = await api.get("/bairros");
    setBairros(resp.data);
  }

  // Filtros
  const imoveisFiltrados = bairroSelecionado
    ? imoveis.filter((i) => i.bairro.id === Number(bairroSelecionado))
    : imoveis;

  useEffect(() => {
    carregarImoveis();
    carregarBairros();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Imóveis</h1>

      {/* FILTRO POR BAIRRO */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filtrar por Bairro:</label>

        <select
          value={bairroSelecionado}
          onChange={(e) => setBairroSelecionado(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos</option>
          {bairros.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nome}
            </option>
          ))}
        </select>
      </div>

      {/* LISTAGEM */}
      {imoveisFiltrados.length === 0 ? (
        <p>Nenhum imóvel encontrado.</p>
      ) : (
        imoveisFiltrados.map((i) => (
          <div key={i.id} className="mb-4 p-3 border-b">
            <p className="font-bold">{i.titulo}</p>
            <p>{i.endereco}</p>
            <p>{i.tipo?.nome}</p>
            <p>Bairro: {i.bairro?.nome}</p>
            <p>R$ {i.valor}</p>

            <div className="mt-2 flex gap-3">
              <Link to={`/imoveis/${i.id}`}>Ver</Link>
              <Link to={`/imoveis/${i.id}/editar`}>Editar</Link>
              <Link to={`/imoveis/${i.id}/fotos`}>Gerenciar Fotos</Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
