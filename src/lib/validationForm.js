import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number.";

export const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  userName: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const FormSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema;
export const ConfirmSchemaLogin = FormSchemaLogin;

export function getFieldError(schema, property, value) {
  try {
    const fieldSchema = z.object({ [property]: schema.shape[property] });

    const result = fieldSchema.safeParse({ [property]: value });

    if (!result.success) {
      return result.error.issues.map((issue) => issue.message).join(", ");
    }

    return undefined;
  } catch (err) {
    console.error(`Validation error on "${property}":`, err);
    return "Validation failed.";
  }
}
export const getErrors = (zodError) =>
  zodError.issues.reduce((all, issue) => {
    const path = issue.path.join(".");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});