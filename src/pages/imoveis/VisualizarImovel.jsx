import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarImovel } from "../../services/imovelService";
import { listarFotosDoImovel, urlFoto } from "../../services/fotoService";

export default function VisualizarImovel() {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    async function load() {
      const i = await buscarImovel(id);
      setImovel(i);

      const f = await listarFotosDoImovel(id);
      setFotos(f);
    }
    load();
  }, [id]);

  if (!imovel) return <h2>Carregando...</h2>;

  return (
    <div className="p-4">
      <h1>{imovel.titulo}</h1>
      <p>{imovel.descricao}</p>

      <h2 className="mt-4">Fotos</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {fotos.length === 0 && <p>Nenhuma foto cadastrada.</p>}

        {fotos.map((foto) => (
          <div key={foto.id}>
            <img
              src={urlFoto(foto.nomeArquivo)}
              alt=""
              style={{
                width: 300,
                height: 200,
                objectFit: "cover",
                border: foto.capa === "S" ? "3px solid green" : "1px solid #ccc",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
