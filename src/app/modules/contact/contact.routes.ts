import { Router } from "express";
import auth from "../../middlewares/auth";
import { ContactController } from "./contact.controller";

const router = Router();

router.route('/')
.post(ContactController.createContactToAdmin)

export const ContactRoutes = router