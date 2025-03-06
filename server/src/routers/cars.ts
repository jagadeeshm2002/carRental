import { Router } from "express";
import { z } from "zod";
import { Type } from "../types/enums";
import Car from "../models/car";

import Review from "../models/review";
import { createCar, getCar, getCars, updateCar } from "../controllers/cars";

const router: Router = Router();

router.post("/", createCar);
router.get("/", getCars);
router.get("/:id", getCar);
router.put("/:id", updateCar);

router.delete("/:id");

router.post("/reviews");
export default router;
