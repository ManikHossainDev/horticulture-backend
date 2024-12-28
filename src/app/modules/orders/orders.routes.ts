// order.route.ts

import express from 'express';
import auth from '../../middlewares/auth';
import { OrderController } from './orders.controllers';

const router = express.Router();

// Route to create an order
router.post(
  '/create-order',
  auth('user', 'businessman'),
  OrderController.createOrder
);
router.post(
  '/success-payment',
  auth('user', 'businessman'),
  OrderController.successPayment
);
router
  .route('/get-user-orders')
  .get(auth('user', 'businessman'), OrderController.getUserOrders);

// Route to get all orders
router.route('/').get(auth('admin'), OrderController.getAllOrders);
router
  .route('/:id')
  .get(auth('common'), OrderController.getSingleOrder)
  .patch(auth('admin'), OrderController.updateOrderStatus);

export const OrderRoutes = router;
