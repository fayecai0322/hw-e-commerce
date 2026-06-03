import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { JwtPayload } from "./types";
//专门负责生成 JWT token
export const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set. Check your .env file.");
  }

  return process.env.JWT_SECRET;
};

export const generateAccessToken = (payload: JwtPayload) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ??
    "1d") as SignOptions["expiresIn"];

  return jwt.sign(payload, getJwtSecret(), {
    expiresIn,
  });
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
