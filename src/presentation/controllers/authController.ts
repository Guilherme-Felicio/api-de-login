import AuthUseCase, { ISignUp } from "@/domain/authUseCase/authUseCase";
import EmailUseCase from "@/domain/emailUseCase/emailUseCase";
import Encrypter from "@/infra/interfaces/adapters/encryptAdapter";
import Validator from "@/infra/interfaces/adapters/validatorAdpter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import { ValidationError } from "@/utils/Errors/validation-error";
import loginValidationSchema from "@/utils/validations/loginValidationSchema";
import signupValidatorSchema from "@/utils/validations/signupValidationShema";
import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

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

interface Login {
  email: string;
  password: string;
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
    const userEmailUseCase = new EmailUseCase();
    const authUseCase = new AuthUseCase(
      authRepository,
      encrypter,
      userEmailUseCase,
    );

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
    const userEmailUseCase = new EmailUseCase();
    const authUseCase = new AuthUseCase(
      authRepository,
      encrypter,
      userEmailUseCase,
    );

    try {
      const data = await authUseCase.validateUser(req.query.token);
      if (!data) return res.status(404).json({ message: "User not Found" });
      return res.status(200).json({ message: "User Validated" });
    } catch (e) {
      next(e);
    }
  }

  async login(
    req: Request<unknown, unknown, Login>,
    res: Response,
    next: NextFunction,
  ) {
    const authRepository = new AuthRepository();
    const encrypter = new Encrypter();
    const userEmailUseCase = new EmailUseCase();
    const authUseCase = new AuthUseCase(
      authRepository,
      encrypter,
      userEmailUseCase,
    );
    const validator = new Validator();

    try {
      const result = validator.validate({
        values: req.body,
        validationSchema: loginValidationSchema,
      });

      if (!result.isValid) {
        throw new ValidationError(result);
      }

      const user = await authUseCase.login(req.body.email, req.body.password);

      if (!user)
        return res.status(401).json({ message: "Invalid email or password" });

      const token = jsonwebtoken.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          isEmailVerified: user.isEmailVerified,
        },
        process.env.JWT_KEY as string,
      );

      return res.status(200).json({ message: "Logged succesfully", token });
    } catch (e) {
      next(e);
    }
  }
}

export default AuthController;
