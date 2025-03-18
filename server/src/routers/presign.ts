import { Router } from "express";
import { presign } from "../controllers/presign";
import { verifyJwt } from "../middlewares/verifyJwt";

const router: Router = Router();

router.get("/", verifyJwt, presign);

export default router;
