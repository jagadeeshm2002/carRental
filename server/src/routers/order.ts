import { Router } from "express";
import {
  createOrder,
  getOrder,
  userGetOrders,
  updateOrder,
  ownerGetOrders
} from "../controllers/orders";
import { verifyRole } from "../middlewares/verifyRole";
import { verifyJwt } from "../middlewares/verifyJwt";

const router: Router = Router();

router.post("/", verifyJwt, createOrder);
router.get("/user/:id", verifyJwt, userGetOrders);
router.get("/owner/:id", verifyJwt, verifyRole("owner"), ownerGetOrders);
router.get("/:id", verifyJwt, verifyRole("owner"), getOrder);
router.put("/:id", verifyJwt, verifyRole("owner"), updateOrder);

export default router;
