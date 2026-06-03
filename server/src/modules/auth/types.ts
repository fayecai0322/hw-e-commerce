import type { Request } from "express";

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: number;
  user?: JwtPayload;
}

export interface SignupInput {
  username: string;
  email: string;
  password: string;
  role?: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  image?: string | null;
  gender?: string | null;
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  image?: string | null;
  gender?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}
