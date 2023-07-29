import authController from "@/controllers/authController";
import express from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [
    body("name").isString().isLength({ min: 1, max: 50 }),
    body("email").isEmail().isLength({ min: 1 }),
    body("password")
      .isString()
      .isLength({ min: 8 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/),
    body("confirmPassword")
      .isString()
      .isLength({ min: 8 })
      .matches(/[a-z]/)
      .matches(/[A-Z]/),
  ],
  authController.signup
);

export default { router };
