import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/signup", authRoutes.router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
