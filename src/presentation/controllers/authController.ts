import User, { IUser } from "@/domain/entities/user";
import Validator from "@/infra/interfaces/adapters/validatorAdpter";
import { ValidationError } from "@/utils/Errors/validation-error";
import signupValidatorSchema from "@/utils/validations/signupValidationShema";
import { NextFunction, Request, Response } from "express";

interface ISignUp extends Request {
  id?: string | number;
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

    const result = new Validator().validate({
      values: { id, name, email, password, confirmPassword },
      validationSchema: signupValidatorSchema,
    });

    if (!result.isValid) {
      return next(new ValidationError(result.detail));
    }

    const user = new User({ name, email, password } as IUser);

    return res.status(200).json({ ok: true });
  }
}

export default AuthController;
