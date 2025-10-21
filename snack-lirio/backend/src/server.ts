import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import productsRouter from "./routes/products";
import ordersRouter from "./routes/orders";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// CORS configuration - permite múltiplas origens
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : ["http://localhost:5173", "http://10.132.2.34:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite requisições sem origin (como ferramentas de API) ou de origens permitidas
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Em desenvolvimento, permite tudo
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// Servir arquivos estáticos de uploads (imagens de produtos)
import path from "path";
import fs from "fs";
const uploadsDir = path.resolve(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// Rota de registro
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        type: type || "cliente"
      }
    });

    const token = jwt.sign(
      { id: user.id, type: user.type },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro ao registrar:", error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota de login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, type: user.type },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
