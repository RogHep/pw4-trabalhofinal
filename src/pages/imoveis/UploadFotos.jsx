import React, { useState, useEffect } from "react";
import { uploadFoto, listarFotosDoImovel, deletarFoto, urlFoto } from "../../services/fotoService";
import { useParams } from "react-router-dom";

export default function UploadFotos() {
  const { id } = useParams();
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [capa, setCapa] = useState("N");
  const [ordem, setOrdem] = useState("");
  const [fotos, setFotos] = useState([]);

  async function carregarFotos() {
    const f = await listarFotosDoImovel(id);
    setFotos(f);
  }

  useEffect(() => {
    carregarFotos();
  }, []);

  function handleFile(e) {
    const file = e.target.files[0];
    setArquivo(file);
    setPreview(URL.createObjectURL(file));
  }

  async function enviar() {
    if (!arquivo) {
      alert("Selecione um arquivo.");
      return;
    }

    const dadosDto = {
      capa,
      ordem,
      imovelId: Number(id),
    };

    try {
      await uploadFoto(arquivo, dadosDto);
      setArquivo(null);
      setPreview(null);
      setCapa("N");
      setOrdem("");
      carregarFotos();
    } catch (e) {
      console.error(e);
      alert("Erro ao enviar foto.");
    }
  }

  async function excluir(idFoto) {
    if (!confirm("Excluir esta foto?")) return;
    await deletarFoto(idFoto);
    carregarFotos();
  }

  return (
    <div className="p-4">
      <h1>Upload de Fotos — Imóvel #{id}</h1>

      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: 300, height: 200, objectFit: "cover", marginTop: 10 }}
        />
      )}

      <div className="mt-3">
        <label>Capa:</label>
        <select value={capa} onChange={(e) => setCapa(e.target.value)}>
          <option value="N">Não</option>
          <option value="S">Sim</option>
        </select>
      </div>

      <div className="mt-2">
        <label>Ordem:</label>
        <input
          type="number"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
        />
      </div>

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={enviar}>
        Enviar Foto
      </button>

      <h2 className="mt-6">Fotos enviadas</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {fotos.map((f) => (
          <div key={f.id}>
            <img
              src={urlFoto(f.nomeArquivo)}
              style={{ width: 200, height: 150, objectFit: "cover" }}
            />
            <br />
            <button onClick={() => excluir(f.id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
