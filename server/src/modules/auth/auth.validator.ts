import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  role: z.string().optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
});

export const loginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});
