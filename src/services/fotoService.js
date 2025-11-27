import api from "./api";

export async function uploadFoto(arquivo, dadosDto) {
  const formData = new FormData();
  formData.append("arquivo", arquivo);
  formData.append("dados", JSON.stringify(dadosDto));

  const response = await api.post("/fotos", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
}
