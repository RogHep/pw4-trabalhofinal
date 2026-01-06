import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    // ================================
    // 🔐 LOGIN ADMIN FIXO
    // ================================
    if (email === "admin@admin.com" && senha === "123") {
      localStorage.setItem("admin", "true");
      localStorage.removeItem("corretor");
      navigate("/");
      return;
    }

    // ================================
    // 🔐 LOGIN CORRETOR VIA BACKEND
    // ================================
    try {
      const resp = await api.post("/corretores/login", { email, senha });

      if (resp.data.admin === true) {
        // caso exista admin no banco no futuro
        localStorage.setItem("admin", "true");
        localStorage.removeItem("corretor");
        navigate("/");
      } else {
        // login corretor normal
        localStorage.setItem("corretor", JSON.stringify(resp.data));
        localStorage.removeItem("admin");
        navigate("/imoveis");
      }

    } catch (err) {
      alert("Credenciais inválidas!");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <label>Email</label>
        <input
          type="email"
          className="input w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="password"
          className="input w-full mb-4"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
