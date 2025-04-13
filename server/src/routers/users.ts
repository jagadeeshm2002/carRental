import { Router } from "express";
import { userDetailsUpdate, getUserDetails, getUserFavorites, addToFavorites, removeFromFavorites } from "../controllers/user";

const router: Router = Router();

router.put("/:id", userDetailsUpdate);
router.get("/:id", getUserDetails);

// Favorites routes - fixed spelling from 'faviourites' to 'favorites'
router.get("/:id/favorites", getUserFavorites);
router.post("/:id/favorites", addToFavorites);
router.delete("/:id/favorites/:carId", removeFromFavorites);

export default router;
