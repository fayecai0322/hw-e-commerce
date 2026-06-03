import type { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../../core/errors";
import { validate } from "../../core/validation/validate";
import type { AuthenticatedRequest } from "../auth/types";
import * as userService from "./user.service";
import {
  createUserSchema,
  findUserQuerySchema,
  updateUserSchema,
  userParamsSchema,
} from "./user.validator";

const assertSelfOrAdmin = (req: AuthenticatedRequest, targetUserId: number) => {
  if (!req.userId || !req.user) {
    throw new UnauthorizedError("Authentication required");
  }

  // Admins can manage any user record; everyone else is limited to self-access.
  if (req.user.role === "admin") {
    return;
  }

  if (req.userId !== targetUserId) {
    throw new ForbiddenError("You can only access your own user record");
  }
};

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await userService.getUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    assertSelfOrAdmin(req, params.id);
    const user = await userService.getUserById(params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const findUserByUsernameOrEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = validate(findUserQuerySchema, req.query);

    if (!req.user || req.user.role !== "admin") {
      throw new ForbiddenError("Admin access required");
    }

    const user = await userService.findUserByUsernameOrEmail(query.identifier);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = validate(createUserSchema, req.body);
    const user = await userService.createUser(body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    assertSelfOrAdmin(req, params.id);
    const body = validate(updateUserSchema, req.body);
    const user = await userService.updateUser(params.id, body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    assertSelfOrAdmin(req, params.id);
    const user = await userService.deleteUser(params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
