import bcrypt from "bcrypt";

export default class Encrypter {
  saltRounds = 8;
  constructor() {}

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds).then((hash) => hash);
  }
}
