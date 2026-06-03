import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../core/errors";
import { validate } from "../../core/validation/validate";
import * as authService from "./auth.service";
import type { AuthenticatedRequest } from "./types";
import { loginSchema, signupSchema } from "./auth.validator";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = validate(signupSchema, req.body);
    const result = await authService.signup(body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = validate(loginSchema, req.body);
    const result = await authService.login(body);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.logout();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.userId) {
      throw new UnauthorizedError("Authentication required");
    }

    const user = await authService.getMe(req.userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
