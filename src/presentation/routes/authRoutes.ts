import AuthController from "@/presentation/controllers/authController";
import express from "express";

const router = express.Router();

router.post("/", new AuthController().signUp);
router.get("/validate", new AuthController().validateUser);

export default { router };
