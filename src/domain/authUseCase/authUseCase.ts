import Encrypter from "@/infra/interfaces/adapters/encryptAdapter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import User from "@/main/entities/user";
import { ConflictError } from "@/utils/Errors/conflict-error";
import { InternalServerError } from "@/utils/Errors/internal-server-error";
import { randomUUID } from "crypto";
import UserEmailUseCase from "../sendCreateUserEmailUseCase/userEmail";

export interface ISignUp {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class AuthUseCase {
  private encrypter: Encrypter;
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository, encrypter: Encrypter) {
    this.authRepository = authRepository;
    this.encrypter = encrypter;
  }

  async SignUp(values: ISignUp) {
    const data = await this.authRepository.getUserByEmail(values.email);

    if (data) {
      throw new ConflictError("Cannot create user. Email already exists");
    }

    const hashedPassword = await this.encrypter.encrypt(
      <string>values.password
    );

    const user = new User({
      name: values.name,
      email: values.email,
      password: hashedPassword,
      id: values.id,
      isEmailVerified: false,
      token: randomUUID(),
    });

    const res = await this.authRepository.create(user);

    const emailResult = await UserEmailUseCase.sendAuthLinkEmail(user);
    if (!emailResult.wasSend) {
      throw new InternalServerError("It was not possible send the email");
    }

    return {
      name: res.name,
      id: res.id,
      email: res.email,
    };
  }
}

export default AuthUseCase;