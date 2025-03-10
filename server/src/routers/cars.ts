import { Router } from "express";
import { createCar, createReview, getCar, getCars, getReviews, updateCar } from "../controllers/cars";

const router: Router = Router();

router.post("/", createCar);
router.get("/", getCars);
router.post("/reviews",createReview);
router.get("/reviews/:id",getReviews);
router.get("/:id", getCar);
router.put("/:id", updateCar);
router.delete("/:id");

export default router;
