import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CreateImovel() {
  const [tipos, setTipos] = useState([]);
  const [bairros, setBairros] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    precoVenda: '',
    precoAluguel: '',
    finalidade: '',
    status: '',
    dormitorios: '',
    banheiros: '',
    garagem: '',
    areaTotal: '',
    areaConstruida: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    caracteristicas: '',
    destaque: false,
    tipoImovel: { id: '' },
    bairro: { id: '' }
  });

  useEffect(() => {
    api.get('/tiposimoveis').then(r => setTipos(r.data));
    api.get('/bairros').then(r => setBairros(r.data));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'tipoImovel' || name === 'bairro') {
      setForm({ ...form, [name]: { id: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = async () => {
    await api.post('/imoveis', form);
    alert('Imóvel cadastrado!');
  };

  return (
    <div style={{padding:20}}>
      <h1>Criar Imóvel</h1>
      <input placeholder="Título" name="titulo" onChange={handleChange} />
      <textarea placeholder="Descrição" name="descricao" onChange={handleChange}/>
      <select name="tipoImovel" onChange={handleChange}>
        <option>Selecione tipo</option>
        {tipos.map(t=><option key={t.id} value={t.id}>{t.nome}</option>)}
      </select>
      <select name="bairro" onChange={handleChange}>
        <option>Selecione bairro</option>
        {bairros.map(b=><option key={b.id} value={b.id}>{b.nome}</option>)}
      </select>
      <button onClick={submit}>Salvar</button>
    </div>
  );
}
