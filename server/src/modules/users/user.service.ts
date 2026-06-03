import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError } from "../../core/errors";
import * as userRepository from "./user.repository";
import type { CreateUserInput, UpdateUserInput } from "./types";

const SALT_ROUNDS = 10;

const hashPassword = async (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const getUsers = async () => {
  return userRepository.findUsers();
};

export const getUserById = async (id: number) => {
  const user = await userRepository.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const findUserByUsernameOrEmail = async (identifier: string) => {
  const user = await userRepository.findPrivateUserByUsernameOrEmail(identifier);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const { password, ...publicUser } = user;

  return publicUser;
};

export const createUser = async (input: CreateUserInput) => {
  const existingUser = await userRepository.findPrivateUserByUsernameOrEmail(
    input.username,
  );

  if (existingUser) {
    throw new BadRequestError("Username or email already exists");
  }

  const existingEmail = await userRepository.findPrivateUserByUsernameOrEmail(
    input.email,
  );

  if (existingEmail) {
    throw new BadRequestError("Username or email already exists");
  }

  // Password hashing belongs in the service so every user-creation path is safe.
  return userRepository.createUser({
    username: input.username,
    email: input.email,
    password: await hashPassword(input.password),
    role: input.role ?? "user",
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    image: input.image,
    gender: input.gender,
  });
};

export const updateUser = async (id: number, input: UpdateUserInput) => {
  const existingUser = await userRepository.findUserById(id);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  if (input.username || input.email) {
    const nextUsername = input.username ?? existingUser.username;
    const nextEmail = input.email ?? existingUser.email;

    const duplicateUsername =
      await userRepository.findPrivateUserByUsernameOrEmail(nextUsername);

    if (duplicateUsername && duplicateUsername.id !== id) {
      throw new BadRequestError("Username or email already exists");
    }

    const duplicateEmail =
      await userRepository.findPrivateUserByUsernameOrEmail(nextEmail);

    if (duplicateEmail && duplicateEmail.id !== id) {
      throw new BadRequestError("Username or email already exists");
    }
  }

  const updateInput = {
    ...input,
    // Only re-hash when the caller is actually changing the password.
    password: input.password ? await hashPassword(input.password) : undefined,
  };

  const updatedUser = await userRepository.updateUser(id, updateInput);

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  const deletedUser = await userRepository.deleteUser(id);

  if (!deletedUser) {
    throw new NotFoundError("User not found");
  }

  return deletedUser;
};
