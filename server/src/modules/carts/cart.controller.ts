import type { NextFunction, Request, Response } from "express";
import { validate } from "../../core/validation/validate";
import * as cartService from "./cart.service";
import {
  addCartItemSchema,
  cartItemParamsSchema,
  updateCartItemSchema,
} from "./cart.validator";

export const getCart = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cart = await cartService.getCart();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = validate(addCartItemSchema, req.body);
    const cart = await cartService.addCartItem(body);

    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(cartItemParamsSchema, req.params);
    const body = validate(updateCartItemSchema, req.body);
    const cart = await cartService.updateCartItem(params.productId, body);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(cartItemParamsSchema, req.params);
    const cart = await cartService.removeFromCart(params.productId);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cart = await cartService.clearCart();

    res.json(cart);
  } catch (error) {
    next(error);
  }
};
