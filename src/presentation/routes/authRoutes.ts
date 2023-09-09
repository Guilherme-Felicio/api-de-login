import express from "express";
import AuthController from "@/presentation/controllers/authController";

const router = express.Router();

router.post("/", new AuthController().signUp);

export default { router };
