import { z } from "zod";
const loginValidationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/),
});
export default loginValidationSchema;
