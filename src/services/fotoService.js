import api from "./api";

export async function uploadFoto(arquivo, dados) {
  const formData = new FormData();
  formData.append("arquivo", arquivo);
  formData.append("dados", JSON.stringify(dados));

  return api.post("/fotos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function listarFotosDoImovel(id) {
  const response = await api.get(`/fotos/imovel/${id}`);
  return response.data;
}

export function urlFoto(nomeArquivo) {
  return `http://localhost:8080/fotos/arquivo/${nomeArquivo}`;
}

export async function deletarFoto(id) {
  return api.delete(`/fotos/${id}`);
}
