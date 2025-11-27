import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

export default function VisualizarImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    api.get(`/imoveis/${id}`).then((res) => setImovel(res.data));

    // Tentativa 1: buscar endpoint por imóvel (quando você ativar no backend)
    api
      .get(`/fotos/imovel/${id}`)
      .then((res) => setFotos(res.data))
      .catch(() => {
        // Tentativa 2: fallback para /fotos (modelo atual do seu backend)
        api.get(`/fotos`).then((res) => {
          // filtra por imovelId, caso venha junto
          setFotos(res.data.filter((f) => f.imovelId === Number(id)));
        });
      });
  }, [id]);

  if (!imovel) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1>{imovel.titulo}</h1>
      <p>{imovel.descricao}</p>

      <h3 className="mt-4">Fotos</h3>

      {fotos.length === 0 ? (
        <p>Nenhuma foto cadastrada</p>
      ) : (
        <div className="flex gap-2 overflow-x-auto">
          {fotos.map((foto) => (
            <img
              key={foto.id}
              src={`file:///${foto.caminho}`}
              alt=""
              className="rounded"
              style={{ height: 150 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
