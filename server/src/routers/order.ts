import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders";
import { verifyRole } from "../middlewares/verifyRole";
import { verifyJwt } from "../middlewares/verifyJwt";

const router: Router = Router();

router.post("/", verifyJwt, createOrder);
router.get("/", verifyJwt, verifyRole("owner"), getOrders);
router.get("/:id", verifyJwt, verifyRole("owner"), getOrder);
router.put("/:id", verifyJwt, verifyRole("owner"), updateOrder);

export default router;
