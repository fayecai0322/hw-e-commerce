import type { JwtPayload } from "../../modules/auth/types";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      user?: JwtPayload;
    }
  }
}

export {};
