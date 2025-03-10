import { Router } from "express";
import { presign } from "../controllers/presign";

const router: Router = Router();

router.get("/", presign);


export default router;
