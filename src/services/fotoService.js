// src/services/fotoService.js
import api from "./api";

/**
 * Envia uma foto conforme seu backend espera:
 * - arquivo: MultipartFile
 * - dados: string JSON (FotoImovelDTO)
 *
 * Aqui fazemos a chamada POST /fotos
 */
export async function uploadFoto(file, dadosDto) {
  const form = new FormData();
  form.append("arquivo", file);
  // enviar dados como string JSON
  form.append("dados", JSON.stringify(dadosDto));

  // Não setar Content-Type; o axios define automaticamente boundary
  const res = await api.post("/fotos", form, {
    headers: { "Content-Type": "multipart/form-data" },
    // allow status 200..399
    validateStatus: s => s >= 200 && s < 400,
  });
  return res;
}
