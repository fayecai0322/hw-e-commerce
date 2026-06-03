import "dotenv/config";
import express from "express";
import cors from "cors";
import { errorMiddleware, NotFoundError } from "./core/errors";
import productRoutes from "./modules/products/product.routes";
import cartRoutes from "./modules/carts/cart.routes";
import userRoutes from "./modules/users/user.routes";
import authRoutes from "./modules/auth/auth.routes";


const app = express();//Express application initialized
const PORT = Number(process.env.PORT) || 3001;//server starts on port 3001
// CORS configured
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// GET / welcome message
app.get("/", (_req, res) => {
  res.json({ message: "Lecture E-Commerce API is running", port: PORT });
});

//productRoutes Added
app.use("/api/products", productRoutes);
//cartRoutes Added
app.use("/api/cart", cartRoutes);
//userRoutes Added
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


// 没匹配上 route -> 进入这个普通 middleware -> next(new NotFoundError())-> Express 发现 next 里面有 error -> 跳到后面的 errorMiddleware
app.use((_req,_res,next)=>{
  next(new NotFoundError());
});
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
