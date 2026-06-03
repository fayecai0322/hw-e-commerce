import bcrypt from "bcrypt";
import { BadRequestError } from "../../core/errors";
import * as userRepository from "../users/user.repository";
import * as userService from "../users/user.service";
import { generateAccessToken } from "./jwt";
import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  LogoutResponse,
  SignupInput,
} from "./types";

const createAuthResponse = (user: AuthUser): AuthResponse => {
  const accessToken = generateAccessToken({
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  return {
    accessToken,
    user,
  };
};

export const signup = async (input: SignupInput): Promise<AuthResponse> => {
  const user = await userService.createUser(input);

  return createAuthResponse(user);
};

export const login = async (input: LoginInput): Promise<AuthResponse> => {
  const user = await userRepository.findPrivateUserByUsernameOrEmail(
    input.identifier,
  );

  if (!user) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password);

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid credentials");
  }

  const { password: _password, ...publicUser } = user;

  return createAuthResponse(publicUser);
};

export const logout = async (): Promise<LogoutResponse> => {
  return {
    success: true,
    message: "Logged out successfully",
  };
};

export const getMe = async (userId: number): Promise<AuthUser> => {
  return userService.getUserById(userId);
};
