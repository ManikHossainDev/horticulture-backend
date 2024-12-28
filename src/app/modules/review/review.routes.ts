import { Router } from "express";
import auth from "../../middlewares/auth";
import { ReviewController } from "./review.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.route("/")
.post(auth("user","businessman"), validateRequest(ReviewValidation.createReviewValidationSchema),  ReviewController.addReview)

router.route("/:id")
.put(auth("user","businessman"),validateRequest(ReviewValidation.updateReviewValidationSchema),  ReviewController.updateReview)
.patch(auth("user","businessman"),ReviewController.updateLikesDislikes)

export const ReviewRoutes = router