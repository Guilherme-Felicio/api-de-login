import bcrypt from "bcrypt";

export default class Encrypter {
  saltRounds = 8;
  constructor() {}

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.saltRounds).then((hash) => hash);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
