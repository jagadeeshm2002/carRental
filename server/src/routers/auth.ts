import { Router } from "express";
import {
  refreshController,
  registerController,
  signinController,
} from "../controllers/auth";

const router: Router = Router();

router.get("/", signinController);
router.post("/", registerController);
router.get("/refresh", refreshController);

export default router;
