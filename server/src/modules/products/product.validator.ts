import { z } from "zod";

export const getProductsQuerySchema = z.object({
  skip: z.coerce.number().int().min(0).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  category: z.string().min(1).optional(),
  search: z.string().min(1).optional(),
});

export const productParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
