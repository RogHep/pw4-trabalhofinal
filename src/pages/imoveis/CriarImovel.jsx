import { useState, useEffect } from "react";
import api from "../../services/api";

export default function CriarImovel() {
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
    bairro: ""
  });

  const [tipos, setTipos] = useState([]);
  const [bairros, setBairros] = useState([]);

  useEffect(() => {
    api.get("/tiposimoveis").then(res => setTipos(res.data));
    api.get("/bairros").then(res => setBairros(res.data));
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  }

  function salvar(e) {
    e.preventDefault();

    const payload = {
      ...form,
      tipoImovel: { id: Number(form.tipoImovel) },
      bairro: { id: Number(form.bairro) }
    };

    api.post("/imoveis", payload)
      .then(() => {
        alert("Imóvel cadastrado!");
      })
      .catch(err => {
        console.log(err);
        alert("Erro ao salvar.");
      });
  }

  return (
    <div className="content">
      <h1>Novo Imóvel</h1>

      <form onSubmit={salvar}>
        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} />

        <label>Descrição</label>
        <textarea name="descricao" value={form.descricao} onChange={handleChange} />

        <label>Preço de Venda</label>
        <input name="precoVenda" value={form.precoVenda} onChange={handleChange} />

        <label>Preço de Aluguel</label>
        <input name="precoAluguel" value={form.precoAluguel} onChange={handleChange} />

        <label>Finalidade</label>
        <select name="finalidade" value={form.finalidade} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="venda">Venda</option>
          <option value="aluguel">Aluguel</option>
        </select>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        <label>Dormitórios</label>
        <input name="dormitorios" value={form.dormitorios} onChange={handleChange} />

        <label>Banheiros</label>
        <input name="banheiros" value={form.banheiros} onChange={handleChange} />

        <label>Garagem</label>
        <input name="garagem" value={form.garagem} onChange={handleChange} />

        <label>Área Total</label>
        <input name="areaTotal" value={form.areaTotal} onChange={handleChange} />

        <label>Área Construída</label>
        <input name="areaConstruida" value={form.areaConstruida} onChange={handleChange} />

        <label>Endereço</label>
        <input name="endereco" value={form.endereco} onChange={handleChange} />

        <label>Número</label>
        <input name="numero" value={form.numero} onChange={handleChange} />

        <label>Complemento</label>
        <input name="complemento" value={form.complemento} onChange={handleChange} />

        <label>CEP</label>
        <input name="cep" value={form.cep} onChange={handleChange} />

        <label>Tipo de Imóvel</label>
        <select name="tipoImovel" value={form.tipoImovel} onChange={handleChange}>
          <option value="">Selecione</option>
          {tipos.map(t => (
            <option key={t.id} value={t.id}>{t.nome}</option>
          ))}
        </select>

        <label>Bairro</label>
        <select name="bairro" value={form.bairro} onChange={handleChange}>
          <option value="">Selecione</option>
          {bairros.map(b => (
            <option key={b.id} value={b.id}>{b.nome}</option>
          ))}
        </select>

        <label>
          <input type="checkbox" name="destaque" checked={form.destaque}
            onChange={handleChange} /> Destaque
        </label>

        <button className="btn">Salvar</button>
      </form>
    </div>
  );
}
