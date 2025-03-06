import { Router } from "express";
import { z } from "zod";
import User from "../models/user";
import { userDetailsUpdate } from "../controllers/user";

const router: Router = Router();

router.put("/:id", userDetailsUpdate);

router.post("/faviourites", (req, res) => {
  const data = req.params;
});
router.get("/faviourites", (req, res) => {
  res.send("faviourites");
});

export default router;
