// src/pages/imoveis/CriarImovel.jsx

import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CriarImovel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    precoVenda: "",
    precoAluguel: "",
    finalidade: "",
    status: "",
    dormitorios: "",
    banheiros: "",
    garagem: "",
    areaTotal: "",
    areaConstruida: "",
    endereco: "",
    numero: "",
    complemento: "",
    cep: "",
    caracteristicas: "",
    destaque: false,
    tipoImovel: "",
    bairro: "",
  });

  const [tipos, setTipos] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    api.get("/tiposimoveis").then((res) => setTipos(res.data));
    api.get("/bairros").then((res) => setBairros(res.data));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // 📌 Criar um novo tipo de imóvel
  function criarTipo() {
    const nome = prompt("Digite o nome do novo tipo de imóvel:");
    if (!nome) return;

    api.post("/tiposimoveis", { nome })
      .then((res) => {
        setTipos((prev) => [...prev, res.data]);
        setForm((prev) => ({ ...prev, tipoImovel: res.data.id }));
        alert("Tipo de imóvel criado com sucesso!");
      })
      .catch(() => alert("Erro ao criar tipo de imóvel"));
  }

  // 📌 Criar um novo bairro
  function criarBairro() {
    const nome = prompt("Digite o nome do novo bairro:");
    if (!nome) return;

    api.post("/bairros", { nome })
      .then((res) => {
        setBairros((prev) => [...prev, res.data]);
        setForm((prev) => ({ ...prev, bairro: res.data.id }));
        alert("Bairro criado com sucesso!");
      })
      .catch(() => alert("Erro ao criar bairro"));
  }

  function salvar(e) {
    e.preventDefault();

    const payload = {
      ...form,

      precoVenda: form.precoVenda ? Number(form.precoVenda) : null,
      precoAluguel: form.precoAluguel ? Number(form.precoAluguel) : null,
      areaTotal: form.areaTotal ? Number(form.areaTotal) : null,
      areaConstruida: form.areaConstruida ? Number(form.areaConstruida) : null,

      dormitorios: form.dormitorios ? Number(form.dormitorios) : null,
      banheiros: form.banheiros ? Number(form.banheiros) : null,
      garagem: form.garagem ? Number(form.garagem) : null,

      tipoImovel: { id: Number(form.tipoImovel) },
      bairro: { id: Number(form.bairro) },
    };

    api.post("/imoveis", payload)
      .then((res) => {
        const novoId = res.data.id;
        alert("Imóvel cadastrado com sucesso!");
        navigate(`/imoveis/${novoId}/fotos`);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao salvar.");
      });
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Novo Imóvel</h1>

      <form onSubmit={salvar} className="grid grid-cols-1 gap-4">

        {/* Título */}
        <div>
          <label className="block font-medium">Título</label>
          <input
            name="titulo"
            className="input"
            value={form.titulo}
            onChange={handleChange}
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            name="descricao"
            className="input"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        {/* Preços */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Preço de Venda</label>
            <input
              type="number"
              name="precoVenda"
              className="input"
              value={form.precoVenda}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Preço de Aluguel</label>
            <input
              type="number"
              name="precoAluguel"
              className="input"
              value={form.precoAluguel}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Finalidade e Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Finalidade</label>
            <select
              name="finalidade"
              className="input"
              value={form.finalidade}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="venda">Venda</option>
              <option value="aluguel">Aluguel</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Status</label>
            <select
              name="status"
              className="input"
              value={form.status}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* Detalhes numéricos */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Dormitórios</label>
            <input
              type="number"
              name="dormitorios"
              className="input"
              value={form.dormitorios}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Banheiros</label>
            <input
              type="number"
              name="banheiros"
              className="input"
              value={form.banheiros}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Garagem</label>
            <input
              type="number"
              name="garagem"
              className="input"
              value={form.garagem}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Áreas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Área Total</label>
            <input
              type="number"
              name="areaTotal"
              className="input"
              value={form.areaTotal}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Área Construída</label>
            <input
              type="number"
              name="areaConstruida"
              className="input"
              value={form.areaConstruida}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Endereço */}
        <div>
          <label className="block font-medium">Endereço</label>
          <input
            name="endereco"
            className="input"
            value={form.endereco}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Número</label>
            <input
              name="numero"
              className="input"
              value={form.numero}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">Complemento</label>
            <input
              name="complemento"
              className="input"
              value={form.complemento}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium">CEP</label>
            <input
              name="cep"
              className="input"
              value={form.cep}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tipo de Imóvel */}
        <div>
          <label className="block font-medium">Tipo de Imóvel</label>

          <div className="flex gap-2">
            <select
              name="tipoImovel"
              className="input w-full"
              value={form.tipoImovel}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={criarTipo}
              className="bg-green-600 text-white px-3 rounded"
            >
              Novo
            </button>
          </div>
        </div>

        {/* Bairro */}
        <div>
          <label className="block font-medium">Bairro</label>

          <div className="flex gap-2">
            <select
              name="bairro"
              className="input w-full"
              value={form.bairro}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {bairros.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.nome}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={criarBairro}
              className="bg-green-600 text-white px-3 rounded"
            >
              Novo
            </button>
          </div>
        </div>

        {/* Destaque */}
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="destaque"
            checked={form.destaque}
            onChange={handleChange}
          />
          Destaque
        </label>

        {/* Botão */}
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Salvar
        </button>
      </form>
    </div>
  );
}
