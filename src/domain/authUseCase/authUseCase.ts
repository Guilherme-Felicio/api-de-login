import User, { IUser } from "@/main/entities/user";
import Validator from "@/infra/interfaces/adapters/validatorAdpter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import { ValidationError } from "@/utils/Errors/validation-error";
import signupValidatorSchema from "@/utils/validations/signupValidationShema";

interface ISignUp {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

class AuthUseCase {
  private validator: Validator;
  private authRepository: AuthRepository;
  constructor(validator: Validator, authRepository: AuthRepository) {
    this.validator = validator;
    this.authRepository = authRepository;
  }

  async SignUp(values: ISignUp) {
    const result = this.validator.validate({
      values,
      validationSchema: signupValidatorSchema,
    });

    if (!result.isValid) {
      throw new ValidationError(result).detail;
    }

    const user = new User({
      name: values.name,
      email: values.email,
      password: values.password,
      id: values.id,
      isEmailVerified: false,
    } as IUser);

    const res = await this.authRepository.create(user);
  }
}

export default AuthUseCase;
