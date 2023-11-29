import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./presentation/routes/authRoutes";
import IBaseError from "./utils/interfaces/base-error";
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
    message: "invalid route",
  });
});

app.use(
  (error: IBaseError, req: Request, res: Response, next: NextFunction) => {
    if (error) {
      return res
        .status(error.statusCode)
        .json({ message: error.message, detail: error.detail });
    } else {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} ${process.env.DATABASE_URL}`);
});
