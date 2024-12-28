import { Router } from "express";
import { FaqController } from "./faq.controllers";
import auth from "../../middlewares/auth";

const router = Router();

router.route('/')
.get(FaqController.getFaqs)
.post(auth("admin"),FaqController.createFaq);

router.route('/:id')
.get(FaqController.getSingleFaq)
.patch(auth("admin"),FaqController.updateFaq)
.delete(auth("admin"),FaqController.deleteFaq);

export const FaqRoutes = router;
