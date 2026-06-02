import type { ZodSchema } from "zod";
import { BadRequestError } from "../errors";

export const validate = <T>(schema: ZodSchema<T>, value: unknown): T => {
  const result = schema.safeParse(value);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new BadRequestError(message || "Invalid request");
  }

  return result.data;
};
