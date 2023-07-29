import { Handler, Request } from "express";
import { validationResult } from "express-validator";

interface ISignUp extends Request {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignupRequest extends Request {
  body: ISignUp;
}

const signup: Handler = (req: SignupRequest, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(422).json(result.mapped());
  return res.status(200).json({ ok: true });
};

export default { signup };
