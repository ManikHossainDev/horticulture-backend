import { Router } from 'express';
import auth from '../../middlewares/auth';
import { AdminController } from './admin.controllers';
import { PaymentController } from '../payment/payment.controllers';

const router = Router();

router
  .route('/get-dashboard-data')
  .get(auth('admin'), AdminController.getDashboardData);
router.get(
  '/get-all-earnings',
  auth('admin'),
  PaymentController.getAllPayments
);
router.get('/earning-graph-chart', auth('admin'),AdminController.earningsGraphChart);

export const AdminRoutes = router;
