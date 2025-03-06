import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";
import orderRouter from "./order";
import carsRouter from "./cars";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/cars", carsRouter);
router.use("/order", orderRouter);

export default router;
