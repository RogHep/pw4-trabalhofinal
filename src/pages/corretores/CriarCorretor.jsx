// src/pages/corretores/CriarCorretor.jsx
import React, { useState } from "react";
import { criarCorretor } from "../../services/corretorService";

export default function CriarCorretor() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function salvar(e) {
    e.preventDefault();

    try {
      await criarCorretor(form);

      alert("Corretor cadastrado com sucesso!");
      setForm({ nome: "", email: "", senha: "" });

    } catch (error) {
      console.error("Erro ao salvar corretor:", error);
      alert("Erro ao cadastrar corretor!");
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Cadastrar Corretor</h1>

      <form onSubmit={salvar} className="space-y-4">

        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="block font-medium">Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button className="px-4 py-2 bg-indigo-600 text-white rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
