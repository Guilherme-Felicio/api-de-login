import AuthController from "@/presentation/controllers/authController";
import express from "express";

const router = express.Router();

router.post("/user", new AuthController().signUp);
router.get("/user/validate", new AuthController().validateUser);

export default { router };
