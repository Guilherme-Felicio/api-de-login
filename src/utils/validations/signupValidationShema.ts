import { z } from "zod";
const signupValidatorSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/),
    confirmPassword: z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirmPassword is not equal",
  });

export default signupValidatorSchema;
