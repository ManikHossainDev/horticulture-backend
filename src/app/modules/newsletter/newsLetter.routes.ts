import { Router } from 'express';
import { NewsLetterController } from './newsLetter.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.route('/').post(NewsLetterController.joinNewsletter);
router.post(
  "/send-newsletter-message",
  auth('admin'),
  NewsLetterController.sendNewsLetterMessage
);

export const NewsLetterRoutes = router;
