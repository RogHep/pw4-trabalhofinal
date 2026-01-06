import api from "./api";

export async function criarCorretor(dados) {
  return api.post("/corretores", dados);
}
