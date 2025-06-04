import { callHuggingFaceAPI } from "../services/huggingfaceService.js";
import sharp from "sharp";

/**
 * Procesa la solicitud, valida texto e imagen, redimensiona y llama al API.
 */
export async function generateImage(req, res) {
  try {
    const { historia, pagina } = req.body;
    const file = req.file;
    if (!historia || historia.trim().length === 0) {
      return res.status(400).json({ error: "El campo 'historia' es obligatorio." });
    }
    if (!file) {
      return res.status(400).json({ error: "La imagen de referencia es obligatoria." });
    }

    // Convertir a PNG 512x512 en memoria
    const pngBuffer = await sharp(file.buffer)
      .resize({ width: 512, height: 512, fit: "contain" })
      .png()
      .toBuffer();

    const dataUri = `data:image/png;base64,${pngBuffer.toString("base64")}`;

    // Llamar a Hugging Face (o fallback)
    const generatedImage = await callHuggingFaceAPI(dataUri, historia, { strength: 0.6 });

    return res.json({
      success: true,
      pagina: pagina || null,
      historia: historia.slice(0, 100) + (historia.length > 100 ? "…" : ""),
      image: generatedImage,
    });
  } catch (err) {
    console.error("Error en generateImage:", err.message);
    return res.status(500).json({ error: err.message });
  }
}