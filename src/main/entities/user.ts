export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  token: string;
}

export default class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean = false;
  token: string;

  constructor({ name, email, password, isEmailVerified, id, token }: IUser) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.isEmailVerified = isEmailVerified;
    this.id = id;
    this.token = token;
  }
}
