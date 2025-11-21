// src/services/imovelService.js
import api from "./api";

export async function listarImoveis() {
  const res = await api.get("/imoveis");
  return res.data || [];
}

export async function buscarImovel(id) {
  const res = await api.get(`/imoveis/${id}`);
  return res.data;
}

export async function criarImovel(payload) {
  // payload deve seguir ImovelModel (veja ImovelModel.java)
  return api.post("/imoveis", payload, { validateStatus: s => s >= 200 && s < 400 });
}

export async function atualizarImovel(id, payload) {
  return api.put(`/imoveis/${id}`, payload);
}

export async function deletarImovel(id) {
  return api.delete(`/imoveis/${id}`);
}

export async function listarTipos() {
  try {
    const res = await api.get("/tiposimoveis");
    return res.data || [];
  } catch (e) {
    return [];
  }
}

export async function listarBairros() {
  try {
    const res = await api.get("/bairros");
    return res.data || [];
  } catch (e) {
    return [];
  }
}
