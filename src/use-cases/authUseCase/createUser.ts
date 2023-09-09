import User from "@/domain/entities/user";

class CreateUser {
  name: string;
  email: string;
  password: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}

export default { CreateUser };
