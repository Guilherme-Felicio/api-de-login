import { ZodEffects, ZodIssue } from "zod";

interface IValidatorReturn {
  isValid: boolean;
  detail?: ZodIssue[];
}

interface IValidatorProps {
  values: unknown;
  validationSchema: ZodEffects<any>;
}

export default class Validator {
  validate({ values, validationSchema }: IValidatorProps): IValidatorReturn {
    const result = validationSchema.safeParse(values);

    if (result.success) {
      return { isValid: true };
    } else {
      return {
        isValid: false,
        detail: result.error.issues,
      };
    }
  }
}
