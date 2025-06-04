import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const HF_TOKEN = process.env.HF_TOKEN;

/**
 * Verifica si un modelo existe y está disponible en la Inference API de Hugging Face.
 * @param {string} modelId - Identificador completo del modelo en Hugging Face.
 * @returns {boolean} - true si el modelo responde 200 a una petición HEAD o GET básica.
 */
export async function validateHuggingFaceModel(modelId) {
  try {
    const url = `https://api-inference.huggingface.co/models/${modelId}`;
    // Hacemos una petición HEAD para validar existencia sin descargar
    const res = await axios.head(url, {
      headers: { Authorization: `Bearer ${HF_TOKEN}` },
      validateStatus: (status) => status < 500, // ignorar 404
    });
    return res.status === 200;
  } catch (err) {
    console.error(`Error validando modelo ${modelId}:`, err.message);
    return false;
  }
}

/**
 * Devuelve un modelo válido: si DEFAULT falla, retorna FALLBACK.
 */
export async function getValidModel() {
  const defaultModel = process.env.DEFAULT_HF_MODEL;
  const fallbackModel = process.env.FALLBACK_HF_MODEL;
  const ok = await validateHuggingFaceModel(defaultModel);
  if (ok) {
    return defaultModel;
  }
  console.warn(`Modelo ${defaultModel} no disponible, usando fallback ${fallbackModel}`);
  const ok2 = await validateHuggingFaceModel(fallbackModel);
  if (ok2) {
    return fallbackModel;
  }
  throw new Error("Ningún modelo válido disponible en Hugging Face.");
}