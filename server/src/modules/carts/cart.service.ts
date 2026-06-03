import { BadRequestError, NotFoundError } from "../../core/errors";
import { getProductById } from "../products/product.service";
import * as cartRepository from "./cart.repository";
import type { AddCartItemInput, UpdateCartItemInput } from "./types";

export const getCart = async (userId: number) => {
  return cartRepository.findCartByUserId(userId);
};

export const addCartItem = async (userId: number, input: AddCartItemInput) => {
  if (input.quantity <= 0) {
    throw new BadRequestError("Quantity must be greater than 0");
  }

  await getProductById(input.productId);

  // Persist cart state for the authenticated user from the JWT context.
  return cartRepository.addCartItem(userId, input.productId, input.quantity);
};

export const updateCartItem = async (
  userId: number,
  productId: number,
  input: UpdateCartItemInput,
) => {
  if (input.quantity <= 0) {
    throw new BadRequestError("Quantity must be greater than 0");
  }

  await getProductById(productId);

  const cart = await cartRepository.updateCartItem(userId, productId, input.quantity);

  if (!cart) {
    throw new NotFoundError("Cart item not found");
  }

  return cart;
};

export const removeFromCart = async (userId: number, productId: number) => {
  const cart = await cartRepository.removeCartItem(userId, productId);

  if (!cart) {
    throw new NotFoundError("Cart item not found");
  }

  return cart;
};

export const clearCart = async (userId: number) => {
  return cartRepository.clearCart(userId);
};
