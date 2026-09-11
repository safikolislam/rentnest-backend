import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";

const router = Router();


router.post("/", auth("TENANT"), reviewController.createReview);


router.get("/:propertyId", reviewController.getPropertyReviews);

export const reviewRoutes = router;