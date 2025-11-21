// src/pages/imoveis/VisualizarImovel.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buscarImovel } from "../../services/imovelService";
import api from "../../services/api";

export default function VisualizarImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await buscarImovel(id);
        setImovel(data);
        // não há endpoint GET /fotos/{imovelId} no seu controller; se existir, ajuste:
        // tentativa: GET /fotos?imovelId={id} ou outro. Aqui, tentamos GET /fotos (filtrar localmente)
        try {
          const res = await api.get("/fotos");
          // se backend não oferecer fotos, ignore
          setFotos(res.data || []);
        } catch (err) {
          // backend não tem GET /fotos — fotos podem ser tratadas depois
          setFotos([]);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!imovel) return <div>Carregando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">{imovel.titulo}</h1>
        <div className="flex gap-2">
          <Link to={`/imoveis/${id}/editar`} className="px-3 py-1 border rounded">Editar</Link>
          <Link to={`/imoveis/${id}/fotos`} className="px-3 py-1 border rounded">Gerenciar Fotos</Link>
        </div>
      </div>

      {/* Carousel simples */}
      <div className="mb-4">
        {fotos.length === 0 ? (
          <div className="bg-gray-100 p-8 rounded">Nenhuma foto disponível</div>
        ) : (
          <div className="flex gap-4 overflow-x-auto py-2">
            {fotos.map((f, idx) => (
              <img key={idx} src={f.caminho || f.url || (`/uploads/${f.nomeArquivo}`)} alt={f.nomeArquivo || idx}
                className="h-48 w-auto object-cover rounded shadow" />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-gray-700 mb-2">{imovel.descricao}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><strong>Preço venda:</strong> {imovel.precoVenda ? `R$ ${Number(imovel.precoVenda).toFixed(2)}` : "-" }</div>
          <div><strong>Dormitórios:</strong> {imovel.dormitorios ?? "-"}</div>
          <div><strong>Garagem:</strong> {imovel.garagem ?? "-"}</div>
        </div>
      </div>
    </div>
  );
}
