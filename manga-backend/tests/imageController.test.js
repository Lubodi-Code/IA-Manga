import request from "supertest";
import express from "express";
import imageRoutes from "../src/routes/index.js";

const app = express();
app.use(express.json());
app.use("/", imageRoutes);

describe("POST /generar", () => {
  it("responde con 400 si falta campo texto o imagen", async () => {
    const res = await request(app).post("/generar").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/'historia' es obligatorio/i);
  });

  it("responde con 400 si falta archivo de imagen", async () => {
    const res = await request(app)
      .post("/generar")
      .field("historia", "Texto de prueba");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/imagen.*obligatoria/i);
  });

  it("genera imagen correctamente cuando se envía texto e imagen", async () => {
    jest.mock("../src/services/huggingfaceService.js", () => ({
      callHuggingFaceAPI: jest.fn().mockResolvedValue("data:image/png;base64,AAA...")
    }));
    const imagePath = __dirname + "/fixtures/test.png"; 
    const res = await request(app)
      .post("/generar")
      .field("historia", "Texto de prueba completo")
      .attach("imagen", imagePath);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("image");
    expect(res.body.image).toMatch(/^data:image\/png;base64,/);
    jest.restoreAllMocks();
  });
});