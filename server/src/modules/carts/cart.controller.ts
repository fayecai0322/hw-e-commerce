import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../core/errors";
import { validate } from "../../core/validation/validate";
import type { AuthenticatedRequest } from "../auth/types";
import * as cartService from "./cart.service";
import {
  addCartItemSchema,
  cartItemParamsSchema,
  updateCartItemSchema,
} from "./cart.validator";

export const getCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    // The authenticated user context determines which cart is returned.
    const cart = await cartService.getCart(req.userId);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const body = validate(addCartItemSchema, req.body);
    const cart = await cartService.addCartItem(req.userId, body);

    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const params = validate(cartItemParamsSchema, req.params);
    const body = validate(updateCartItemSchema, req.body);
    const cart = await cartService.updateCartItem(req.userId, params.productId, body);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeCartItem = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const params = validate(cartItemParamsSchema, req.params);
    const cart = await cartService.removeFromCart(req.userId, params.productId);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const cart = await cartService.clearCart(req.userId);

    res.json(cart);
  } catch (error) {
    next(error);
  }
};
