import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";
import orderRouter from "./order";
import carsRouter from "./cars";
import presignRouter from "./presign";
import { verifyJwt } from "../middlewares/verifyJwt";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/users", verifyJwt, userRouter);
router.use("/cars", carsRouter);
router.use("/order", orderRouter);
router.use("/presign", presignRouter);

export default router;
