import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CompanyReviewController } from './companyReview.controllers';

const router = Router();

router
  .route('/')
  .post(auth('user', 'businessman'), CompanyReviewController.addCompanyReview);

router
  .route('/:id')
  .patch(
    auth('user', 'businessman'),
    CompanyReviewController.updateCompanyReview
  );

export const CompanyReviewRoutes = router;
