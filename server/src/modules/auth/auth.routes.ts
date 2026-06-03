import { Router } from "express";
import { getMe, login, logout, signup } from "./auth.controller";
import { requireAuth } from "./auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", requireAuth, logout);
router.get("/me", requireAuth, getMe);

export default router;
