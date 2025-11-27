import React, { useState } from "react";
import { uploadFoto } from "../../services/fotoService";
import { useParams } from "react-router-dom";

export default function UploadFotos() {
  const { id } = useParams(); // ID do imóvel na URL
  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [capa, setCapa] = useState("N");
  const [ordem, setOrdem] = useState("");

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
      imovelId: Number(id) // necessário para vincular a foto ao imóvel
    };

    try {
      await uploadFoto(arquivo, dadosDto);
      alert("Foto enviada com sucesso!");
      setArquivo(null);
      setPreview(null);
      setOrdem("");
      setCapa("N");
    } catch (e) {
      console.error(e);
      alert("Erro ao enviar foto.");
    }
  }

  return (
    <div className="p-4">
      <h1>Upload de Fotos — Imóvel #{id}</h1>

      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: 300, marginTop: 10, border: "1px solid #ccc" }}
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

      <button
        onClick={enviar}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enviar Foto
      </button>
    </div>
  );
}
