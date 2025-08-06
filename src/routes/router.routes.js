import { Router } from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
import ticketRouter from "./tickets.routes.js";
import statsRouter from "./stats.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/tickets", ticketRouter);
router.use("/stats", statsRouter);

export default router;