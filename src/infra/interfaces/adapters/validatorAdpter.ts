import { ZodEffects, ZodIssue, z } from "zod";

interface IValidatorReturn {
  isValid: boolean;
  detail?: ZodIssue[];
  values: unknown;
}

interface IValidatorProps {
  values: unknown;
  validationSchema: ZodEffects<z.AnyZodObject>;
}

export default class Validator {
  validate({ values, validationSchema }: IValidatorProps): IValidatorReturn {
    const result = validationSchema.safeParse(values);

    if (result.success) {
      return { isValid: true, values };
    } else {
      return {
        isValid: false,
        detail: result.error.issues,
        values,
      };
    }
  }
}
