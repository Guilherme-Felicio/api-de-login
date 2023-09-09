export interface IUser {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  isEmailVerified?: boolean;
}

export default class User {
  id?: string | number;
  name: string;
  email: string;
  password: string;
  isEmailVerified?: boolean = false;

  constructor({ name, email, password, isEmailVerified, id }: IUser) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.isEmailVerified = isEmailVerified;
    this.id = id;
  }
}
