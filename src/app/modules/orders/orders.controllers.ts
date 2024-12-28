// order.controller.ts

import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { OrderService } from './orders.services';
import pick from '../../../shared/pick';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  // Check if userId exists
  if (!userId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }

  req.body.userId = userId; // Set the userId on the request body

  // Create the order through the service layer
  const result = await OrderService.createOrder(req.body);

  // Send the response to the frontend with the checkout URL and sessionId
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order created successfully, proceed with payment.',
    data: result,
  });
});

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const { session_id } = req.query; // Get the session_id from the query params

  // Check if the session_id is provided
  if (!session_id) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Session ID is required.');
  }

  // Handle the success of the payment and update the order details
  const order = await OrderService.handlePaymentSuccess(session_id as string);

  // Send the response indicating the payment was successful and order updated
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment successful, order updated.',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['userName', 'productName', 'orderStatus']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);

  const result = await OrderService.getAllOrders(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['userName', 'productName', 'orderStatus']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const userId = req.user.id;
  filters.userId = userId;
  const result = await OrderService.getUserOrders(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User orders retrieved successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await OrderService.getSingleOrder(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id; 
  const {status} = req.body
  const result = await OrderService.updateOrderStatus(id, status);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Order status updated to ${status}`,
    data: result,
  });
});

export const OrderController = {
  createOrder,
  successPayment,
  getAllOrders,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus
};
