import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./presentation/routes/authRoutes";
import { ValidationError } from "./utils/Errors/validation-error";
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
app.use("/", (req: Request, res: Response) => {
  return res.status(404).json({
    message: "inavlid route",
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ValidationError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, detail: error.detail });
  } else {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
