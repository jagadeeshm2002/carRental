import { Router } from "express";
import {
  createCar,
  createReview,
  getCar,
  getCars,
  getReviews,
  updateCar,
} from "../controllers/cars";

const router: Router = Router();

router.post("/", createCar);
router.get("/", getCars);
router.post("/:id/reviews", createReview);
router.get("/:id/reviews", getReviews);
router.get("/:id", getCar);
router.put("/:id", updateCar);
// router.delete("/:id");

export default router;
