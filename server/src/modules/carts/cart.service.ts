import { BadRequestError, NotFoundError } from "../../core/errors";
import { getProductById } from "../products/product.service";
import * as cartRepository from "./cart.repository";
import type { AddCartItemInput, UpdateCartItemInput } from "./types";

const DEFAULT_USER_ID = 1;

export const getCart = async () => {
  return cartRepository.findCartByUserId(DEFAULT_USER_ID);
};

export const addCartItem = async (input: AddCartItemInput) => {
  if (input.quantity <= 0) {
    throw new BadRequestError("Quantity must be greater than 0");
  }

  await getProductById(input.productId);

  return cartRepository.addCartItem(
    DEFAULT_USER_ID,
    input.productId,
    input.quantity,
  );
};

export const updateCartItem = async (
  productId: number,
  input: UpdateCartItemInput,
) => {
  if (input.quantity <= 0) {
    throw new BadRequestError("Quantity must be greater than 0");
  }

  await getProductById(productId);

  const cart = await cartRepository.updateCartItem(
    DEFAULT_USER_ID,
    productId,
    input.quantity,
  );

  if (!cart) {
    throw new NotFoundError("Cart item not found");
  }

  return cart;
};

export const removeFromCart = async (productId: number) => {
  const cart = await cartRepository.removeCartItem(DEFAULT_USER_ID, productId);

  if (!cart) {
    throw new NotFoundError("Cart item not found");
  }

  return cart;
};

export const clearCart = async () => {
  return cartRepository.clearCart(DEFAULT_USER_ID);
};
