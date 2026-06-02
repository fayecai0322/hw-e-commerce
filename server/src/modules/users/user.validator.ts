import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./user.schema";

export const createUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createUserSchema.partial();

export const userParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const findUserQuerySchema = z.object({
  identifier: z.string().min(1),
});
