import { Router } from "express";
import userRouter from "./users";
import authRouter from "./auth";

const router: Router = Router();

router.use("/auth", authRouter);

export default router;
