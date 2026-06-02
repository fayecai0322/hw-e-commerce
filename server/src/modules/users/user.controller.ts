import type { NextFunction, Request, Response } from "express";
import { validate } from "../../core/validation/validate";
import * as userService from "./user.service";
import {
  createUserSchema,
  findUserQuerySchema,
  updateUserSchema,
  userParamsSchema,
} from "./user.validator";

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    const user = await userService.getUserById(params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const findUserByUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = validate(findUserQuerySchema, req.query);

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    const body = validate(updateUserSchema, req.body);
    const user = await userService.updateUser(params.id, body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const params = validate(userParamsSchema, req.params);
    const user = await userService.deleteUser(params.id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
