import express from "express";
import multer from "multer";
import { generateImage } from "../controllers/imageController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();

// POST /generar: recibe 'historia', 'pagina' y archivo 'imagen'
router.post("/generar", upload.single("imagen"), generateImage);

export default router;