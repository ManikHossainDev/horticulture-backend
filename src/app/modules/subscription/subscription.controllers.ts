import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SubscriptionService } from './subscription.service';
import pick from '../../../shared/pick';

const createSubscription = catchAsync(async (req, res, next) => {
  const result = await SubscriptionService.createSubscription(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription created successfully',
    data: result,
  });
});

//purchase subscription
const purchaseSubscription = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { subscriptionId } = req.body;
  const result = await SubscriptionService.purchaseSubscription(
    userId,
    subscriptionId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription checkout successfully',
    data: result,
  });
});

//complete subscription payment
const completeSubscriptionPayment = catchAsync(async (req, res, next) => {
  const { sessionId, subscriptionId } = req.body;
  const result = await SubscriptionService.completeSubscriptionPayment(
    sessionId,
    subscriptionId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription payment completed successfully',
    data: result,
  });
});

const getAllSubscriptions = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'categoryName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await SubscriptionService.getAllSubscriptions(
    filters,
    options
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscriptions retrieved successfully',
    data: result,
  });
});

const getSingleSubscription = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await SubscriptionService.getSubscriptionById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription retrieved successfully',
    data: result,
  });
});

const updateSubscription = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await SubscriptionService.updateSubscription(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription updated successfully',
    data: result,
  });
});

const deleteSubscription = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await SubscriptionService.deleteSubscription(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription deleted successfully',
    data: {},
  });
});

export const SubscriptionController = {
  createSubscription,
  getAllSubscriptions,
  getSingleSubscription,
  updateSubscription,
  deleteSubscription,
  purchaseSubscription,
  completeSubscriptionPayment
};
