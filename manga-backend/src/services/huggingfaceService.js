import axios from "axios";
import { getValidModel } from "../utils/modelValidator.js";
import dotenv from "dotenv";

dotenv.config();
const HF_TOKEN = process.env.HF_TOKEN;

/**
 * Llama a la Inference API de Hugging Face con un payload image-to-image (o text-to-image si el modelo no acepta image).
 * @param {string} imageDataUri - Data URI ("data:image/png;base64,...").
 * @param {string} promptText - Texto descriptivo (opcional, según el modelo).
 * @param {object} options - Opcionales: { strength, seed }.
 * @returns {string} Data URI de la imagen generada.
 */
export async function callHuggingFaceAPI(imageDataUri, promptText = "", options = {}) {
  const modelId = await getValidModel();
  const apiUrl = `https://api-inference.huggingface.co/models/${modelId}`;

  const payload = {
    inputs: imageDataUri,
    parameters: {
      prompt: promptText,
      strength: options.strength ?? 0.6,
      num_inference_steps: options.num_inference_steps ?? 50,
      seed: options.seed ?? -1,
    },
    options: { wait_for_model: true },
  };

  try {
    const response = await axios.post(apiUrl, payload, {
      headers: { Authorization: `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" },
      responseType: "arraybuffer",
      timeout: 120000,
    });
    const contentType = response.headers["content-type"] || "image/png";
    const imgBase64 = Buffer.from(response.data).toString("base64");
    return `data:${contentType};base64,${imgBase64}`;
  } catch (err) {
    console.error("HuggingFace API error details:", err.response?.data || err.message);
    throw new Error(`HuggingFace API error: ${err.message}`);
  }
}