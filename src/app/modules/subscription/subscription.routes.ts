import { Router } from 'express';
import auth from '../../middlewares/auth';
import { SubscriptionController } from './subscription.controllers';

const router = Router();

//purchase a subscription
router
  .route('/purchase-subscription')
  .post(auth('businessman'), SubscriptionController.purchaseSubscription);
router
  .route('/complete-subscription-payment')
  .post(SubscriptionController.completeSubscriptionPayment);

router
  .route('/')
  .post(auth('admin'), SubscriptionController.createSubscription)
  .get(SubscriptionController.getAllSubscriptions);

router
  .route('/:id')
  .get(SubscriptionController.getSingleSubscription)
  .patch(auth('admin'), SubscriptionController.updateSubscription)
  .delete(auth('admin'), SubscriptionController.deleteSubscription);

export const SubscriptionRoutes = router;
