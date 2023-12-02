import AuthUseCase, { ISignUp } from "@/domain/authUseCase/authUseCase";
import Encrypter from "@/infra/interfaces/adapters/encryptAdapter";
import Validator from "@/infra/interfaces/adapters/validatorAdpter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import { ValidationError } from "@/utils/Errors/validation-error";
import signupValidatorSchema from "@/utils/validations/signupValidationShema";
import { NextFunction, Request, Response } from "express";

interface SignupRequest {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ValidateUserRequest extends Request {
  token: string;
}

class AuthController {
  async signUp(
    req: Request<unknown, unknown, SignupRequest>,
    res: Response,
    next: NextFunction,
  ) {
    const validator = new Validator();
    const authRepository = new AuthRepository();
    const encrypter = new Encrypter();
    const authUseCase = new AuthUseCase(authRepository, encrypter);

    try {
      const result = validator.validate({
        values: req.body,
        validationSchema: signupValidatorSchema,
      });

      if (!result.isValid) {
        throw new ValidationError(result);
      }

      const user = await authUseCase.SignUp(result.values as ISignUp);
      return res.status(200).json({
        created: true,
        user: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async validateUser(
    req: Request<unknown, unknown, unknown, ValidateUserRequest>,
    res: Response,
    next: NextFunction,
  ) {
    const authRepository = new AuthRepository();
    const encrypter = new Encrypter();
    const authUseCase = new AuthUseCase(authRepository, encrypter);

    try {
      await authUseCase.validateUser(req.query.token);
      return res.status(200).json({ message: "User Validated" });
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
