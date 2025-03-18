import { Router } from "express";
import {
  createCar,
  createReview,
  getCar,
  getCars,
  getReviews,
  updateCar,
} from "../controllers/cars";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";

const router: Router = Router();

router.post("/", verifyJwt, verifyRole("owner"), createCar);
router.get("/", getCars);
router.post("/:id/reviews", verifyJwt, verifyRole("owner"), createReview);
router.get("/:id/reviews", getReviews);
router.get("/:id", getCar);
router.put("/:id", verifyJwt, verifyRole("owner"), updateCar);
// router.delete("/:id");

export default router;
