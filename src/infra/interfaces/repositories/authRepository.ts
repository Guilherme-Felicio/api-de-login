import User from "@/main/entities/user";
import { InternalServerError } from "@/utils/Errors/internal-server-error";
import { PrismaClient } from "@prisma/client";

export default class AuthRepository {
  constructor() {}

  async create(user: User) {
    const prisma = new PrismaClient();

    try {
      const data = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          isEmailVerified: user.isEmailVerified,
          token: user.token,
        },
      });

      return data;
    } catch (e) {
      throw new InternalServerError(e);
    }
  }

  async getUserByEmail(email: string) {
    const prisma = new PrismaClient();

    try {
      const data = await prisma.user.findUnique({
        where: { email: email },
      });

      return data;
    } catch (e) {
      throw new InternalServerError(e);
    }
  }
}
