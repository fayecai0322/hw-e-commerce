import type { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../../core/errors";
import { verifyAccessToken } from "./jwt";
import type { AuthenticatedRequest } from "./types";

export const requireAuth = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    // Expect a standard Bearer token header for protected routes.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Missing or invalid token");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Missing or invalid token");
    }

    const decoded = verifyAccessToken(token);

    // Attach the authenticated user context for downstream handlers.
    req.userId = decoded.userId;
    req.user = decoded;

    next();
  } catch (_error) {
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

export const requireRole = (role: string) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    // Role checks happen after authentication has populated req.user.
    if (req.user.role !== role) {
      return next(new ForbiddenError("Insufficient permissions"));
    }

    next();
  };
};
