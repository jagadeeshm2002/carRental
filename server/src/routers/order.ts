import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders";

const router: Router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.put("/:id", updateOrder);

export default router;
