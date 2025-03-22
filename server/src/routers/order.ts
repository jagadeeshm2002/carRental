import { Router } from "express";
import {
  createOrder,
  getOrder,
  userGetOrders,
  updateOrder,
} from "../controllers/orders";
import { verifyRole } from "../middlewares/verifyRole";
import { verifyJwt } from "../middlewares/verifyJwt";

const router: Router = Router();

router.post("/", verifyJwt, createOrder);
router.get("/user/:id", verifyJwt, userGetOrders);
router.get("/:id", verifyJwt, verifyRole("owner"), getOrder);
router.put("/:id", verifyJwt, verifyRole("owner"), updateOrder);

export default router;
