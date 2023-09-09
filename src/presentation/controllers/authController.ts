import Validator from "@/infra/interfaces/adapters/validatorAdpter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import AuthUseCase from "@/domain/authUseCase/authUseCase";
import { NextFunction, Request, Response } from "express";

interface ISignUp extends Request {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignupRequest {
  body: ISignUp;
}

class AuthController {
  signUp(req: SignupRequest, res: Response, next: NextFunction) {
    const { id, name, email, password, confirmPassword } = req.body;

    const validator = new Validator();
    const authRepository = new AuthRepository();
    const authUseCase = new AuthUseCase(validator, authRepository);

    try {
      authUseCase.SignUp({ id, name, email, password, confirmPassword });
      return res.status(200).json({ ok: true });
    } catch (e) {
      next(e);
      return;
    }
  }
}

export default AuthController;
