import prisma from "@/infra/dbClient/client";
import User from "@/main/entities/user";
import { InternalServerError } from "@/utils/Errors/internal-server-error";

export default class AuthRepository {
  constructor() {}

  async create(user: User) {
    

    console.log("oi");
    

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
