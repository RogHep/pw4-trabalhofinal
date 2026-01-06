// src/pages/imoveis/UploadFotos.jsx

import React, { useState, useEffect } from "react";
import {
  uploadFoto,
  listarFotosDoImovel,
  deletarFoto,
  urlFoto
} from "../../services/fotoService";
import { useParams } from "react-router-dom";

export default function UploadFotos() {
  const { id } = useParams();

  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [capa, setCapa] = useState("N");
  const [ordem, setOrdem] = useState("");
  const [fotos, setFotos] = useState([]);

  // ============================
  //   CARREGA FOTOS DO IMÓVEL
  // ============================
  async function carregarFotos() {
    try {
      if (!id) return;

      const f = await listarFotosDoImovel(id);
      setFotos(f);
    } catch (e) {
      console.error("Erro ao carregar fotos:", e);
    }
  }

  // Agora só roda quando o ID existir
  useEffect(() => {
    if (id) carregarFotos();
  }, [id]);

  // =================================
  //   SELECIONAR ARQUIVO E PREVIEW
  // =================================
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    setArquivo(file);
    setPreview(URL.createObjectURL(file));
  }

  // ============================
  //     ENVIAR A FOTO
  // ============================
  async function enviar() {
    if (!arquivo) {
      alert("Selecione um arquivo.");
      return;
    }

    if (!id) {
      alert("ID do imóvel inválido.");
      return;
    }

    const dadosDto = {
      capa,
      ordem,
      imovelId: Number(id)
    };

    try {
      await uploadFoto(arquivo, dadosDto);

      // RESET
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

  // ============================
  //      EXCLUIR FOTO
  // ============================
  async function excluir(idFoto) {
    if (!confirm("Excluir esta foto?")) return;

    try {
      await deletarFoto(idFoto);
      carregarFotos();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir foto.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Upload de Fotos — Imóvel #{id}
      </h1>

      {/* Campo de upload */}
      <input type="file" accept="image/*" onChange={handleFile} />

      {/* Preview da imagem */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: 300,
            height: 200,
            objectFit: "cover",
            marginTop: 10,
            borderRadius: 6
          }}
        />
      )}

      {/* Seleção de capa */}
      <div className="mt-3">
        <label>Capa:</label>
        <select value={capa} onChange={(e) => setCapa(e.target.value)}>
          <option value="N">Não</option>
          <option value="S">Sim</option>
        </select>
      </div>

      {/* Ordem */}
      <div className="mt-2">
        <label>Ordem:</label>
        <input
          type="number"
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          className="ml-2"
        />
      </div>

      {/* Botão */}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={enviar}
      >
        Enviar Foto
      </button>

      {/* Lista de fotos */}
      <h2 className="mt-6 text-xl font-semibold">Fotos enviadas</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {fotos.map((f) => (
          <div key={f.id}>
            <img
              src={urlFoto(f.nomeArquivo)}
              style={{
                width: 200,
                height: 150,
                objectFit: "cover",
                borderRadius: 6
              }}
            />
            <br />
            <button
              onClick={() => excluir(f.id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
