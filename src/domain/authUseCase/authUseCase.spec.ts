import Encrypter from "@/infra/interfaces/adapters/encryptAdapter";
import AuthRepository from "@/infra/interfaces/repositories/authRepository";
import User from "@/main/entities/user";
import { ConflictError } from "@/utils/Errors/conflict-error";
import AuthUseCase from "./authUseCase";

class AuthRepositorySpy {
  user: null | User = null;
  constructor() {}

  async create(user: User): Promise<User> {
    this.user = user;
    return { ...this.user, id: 1 };
  }

  async getUserByEmail(email: string) {
    if (email === "exist_email@email.com")
      return {
        name: "any",
        email: "exist_email@email.com",
        password: "password",
        confirmPassword: "password",
      };
    return null;
  }

  async updateVerifyEmail(token: string) {
    if (token === "valid_token")
      return {
        id: 1,
        name: "any",
        email: "exist_email@email.com",
        password: "password",
        isEmailVerified: true,
        token,
      };

    return null;
  }

  async getUserByToken(token: string) {
    if (token === "valid_token") {
      return {
        id: 1,
        name: "any",
        email: "success_email@email.com",
        password: "password",
        isEmailVerified: true,
        token,
      };
    }
    return null;
  }
}

class EmailUseCaseSpy {
  constructor() {}

  async sendAuthLinkEmail(user: User) {
    if (user.email === "success_email@email.com")
      return {
        wasSend: true,
        detail: "",
      };
    return {
      wasSend: false,
      detail: "",
    };
  }
}

const makeSut = () => {
  const authUseCase = new AuthUseCase(
    new AuthRepositorySpy() as AuthRepository,
    new Encrypter(),
    new EmailUseCaseSpy(),
  );
  return authUseCase;
};

describe("AuthUseCase signup", () => {
  test("should throw an error if already has an email registered", async () => {
    const authUseCase = makeSut();

    const promise = authUseCase.SignUp({
      name: "any",
      email: "exist_email@email.com",
      password: "password",
      confirmPassword: "password",
    });
    expect(promise).rejects.toThrow(
      new ConflictError("Cannot create user. Email already exists"),
    );
  });

  test("should return throw if email dependencie throw", () => {
    const authUseCase = makeSut();

    const promise = authUseCase.SignUp({
      name: "any",
      email: "unsuccessful_send@email.com",
      password: "password",
      confirmPassword: "password",
    });

    expect(promise).rejects.toThrow();
  });

  test("should return valid object if everything is ok", async () => {
    const authUseCase = makeSut();

    const result = await authUseCase.SignUp({
      name: "any",
      email: "success_email@email.com",
      password: "password",
      confirmPassword: "password",
    });

    expect(result).toStrictEqual({
      email: "success_email@email.com",
      id: 1,
      name: "any",
    });
  });
});

describe("AuthUseCase login", () => {
  test("should return null if password or email is not valid ", async () => {
    const authUseCase = makeSut();

    const result = await authUseCase.login(
      "exist_email@email.com",
      "invalid_password",
    );

    const result2 = await authUseCase.login(
      "non_exist_email@email.com",
      "password",
    );

    expect(result).toBe(null);
    expect(result2).toBe(null);
  });
});

describe("AuthUseCase validateUser", () => {
  test("should return a user if token is valid ", async () => {
    const authUseCase = makeSut();

    const result = await authUseCase.validateUser("valid_token");

    expect(result).toStrictEqual({
      id: 1,
      name: "any",
      email: "exist_email@email.com",
      password: "password",
      token: "valid_token",
      isEmailVerified: true,
    });
  });

  test("should return null if token is not valid ", async () => {
    const authUseCase = makeSut();

    const result = await authUseCase.validateUser("invalid_token");

    expect(result).toBe(null);
  });
});
