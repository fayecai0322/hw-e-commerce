import { Router } from "express";
import { requireAuth, requireRole } from "../auth/auth.middleware";
import {
  createUser,
  deleteUser,
  findUserByUsernameOrEmail,
  getUserById,
  getUsers,
  updateUser,
} from "./user.controller";

const router = Router();

// All user endpoints are protected; route-level rules narrow access further.
router.use(requireAuth);

router.get("/", requireRole("admin"), getUsers);
router.get("/search", requireRole("admin"), findUserByUsernameOrEmail);
router.get("/:id", getUserById);
router.post("/", requireRole("admin"), createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
