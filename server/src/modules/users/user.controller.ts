import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../core/errors";
import * as userService from "./user.service";

export const getUsers = (_req: Request, res: Response) => {
  const users = userService.getUsers();

  res.json(users);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const user = userService.getUserById(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const findUserByUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const identifier =
      typeof req.query.identifier === "string" ? req.query.identifier : "";

    if (!identifier) {
      throw new BadRequestError("Username or email is required");
    }

    const user = userService.findUserByUsernameOrEmail(identifier);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = userService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const user = userService.updateUser(userId, req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.id);
    const user = userService.deleteUser(userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
