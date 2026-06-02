import { z } from "zod";

export const addCartItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce.number().int().positive(),
});

export const cartItemParamsSchema = z.object({
  productId: z.coerce.number().int().positive(),
});
