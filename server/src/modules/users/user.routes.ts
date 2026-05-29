import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUserByUsernameOrEmail,
  getUserById,
  getUsers,
  updateUser,
} from "./user.controller";

const router = Router();

router.get("/", getUsers);
router.get("/search", findUserByUsernameOrEmail);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
