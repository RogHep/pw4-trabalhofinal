// src/pages/imoveis/EditarImovel.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { buscarImovel, atualizarImovel, listarTipos, listarBairros } from "../../services/imovelService";

export default function EditarImovel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [tipos, setTipos] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [tipoList, bairroList] = await Promise.all([listarTipos(), listarBairros()]);
        setTipos(tipoList); 
        setBairros(bairroList);

        const im = await buscarImovel(id);
        
        setForm({
          ...im,
          precoVenda: im.precoVenda ?? "",
          precoAluguel: im.precoAluguel ?? "",
          tipoImovel: im.tipoImovel ? { id: im.tipoImovel.id } : { id: null },
          bairro: im.bairro ? { id: im.bairro.id } : { id: null }
        });
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar imóvel");
        navigate("/imoveis");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "tipoImovel" || name === "bairro") {
      setForm(f => ({ ...f, [name]: { id: Number(value) } }));
    } else if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const payload = { ...form };

      if (payload.precoVenda === "") payload.precoVenda = null;
      if (payload.precoAluguel === "") payload.precoAluguel = null;

      await atualizarImovel(id, payload);
      alert("Imóvel atualizado!");
      navigate(`/imoveis/${id}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar imóvel");
    }
  }

  if (loading || !form) return <div>Carregando...</div>;

  return (
    <div>
      <Link to={`/imoveis/${id}/fotos`} className="px-3 py-2 border rounded">
        Gerenciar Fotos
      </Link>

      <h1 className="text-2xl font-semibold mb-4">Editar Imóvel</h1>

      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label>Título</label>
          <input
            name="titulo"
            value={form.titulo || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded border-gray-300 p-2"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded bg-gray-200">
            Cancelar
          </button>
          <button type="submit" className="px-6 py-2 rounded bg-indigo-600 text-white">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
