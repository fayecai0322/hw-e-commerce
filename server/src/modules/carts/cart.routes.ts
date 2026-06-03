import { Router} from "express";
import { requireAuth } from "../auth/auth.middleware";
import { getCart, addCartItem, updateCartItem, removeCartItem, clearCart } from "./cart.controller";

const router = Router();

router.use(requireAuth);
router.get("/", getCart);
router.post("/items", addCartItem);
router.patch("/items/:productId", updateCartItem);
router.delete("/items/:productId", removeCartItem);
router.delete("/", clearCart);

export default router;


// routes.ts     只连接 URL 和 controller
// controller.ts 接 req/res/next，然后调用 service
// service.ts    只处理业务逻辑，不认识 Express
