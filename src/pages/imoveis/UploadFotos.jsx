// src/pages/imoveis/UploadFotos.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadFoto } from "../../services/fotoService";

export default function UploadFotos() {
  const { id } = useParams(); // id do imovel (se quiser associar)
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  function handleFiles(e) {
    setFiles(Array.from(e.target.files));
  }

  async function handleUpload() {
    if (files.length === 0) {
      alert("Selecione ao menos uma foto");
      return;
    }
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // preparar DTO de foto — seu backend exige capa e ordem no DTO
        const dadosDto = {
          id: null,
          nomeArquivo: null,
          caminho: null,
          capa: i === 0 ? "S" : "N", // marcar primeira como capa (exemplo)
          ordem: String(i + 1)
        };
        await uploadFoto(file, dadosDto);
      }
      alert("Fotos enviadas com sucesso");
      navigate(`/imoveis/${id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar fotos");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Upload de fotos</h1>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <input type="file" multiple accept="image/*" onChange={handleFiles} />
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((f, i) => (
              <div key={i} className="border rounded p-1">
                <img src={URL.createObjectURL(f)} alt={f.name} className="h-28 w-full object-cover rounded" />
                <div className="text-xs mt-1">{f.name}</div>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2 justify-end">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-gray-200">Cancelar</button>
          <button onClick={handleUpload} disabled={uploading} className="px-4 py-2 rounded bg-indigo-600 text-white">{uploading ? "Enviando..." : "Enviar fotos"}</button>
        </div>
      </div>
    </div>
  );
}
