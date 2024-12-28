import Stripe from 'stripe';
import { ICartItem, IOrder, TOrderStatus } from './orders.interface';
import { Order } from './orders.model';
import createStripeCheckoutSession from './orders.utils';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { Payment } from '../payment/payment.model';

// Initialize Stripe
export const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

// Create Order Service
const createOrder = async (
  payload: Partial<IOrder>
): Promise<{ checkoutUrl: string; sessionId: string }> => {
  // Create Stripe Checkout session for the order
  const session = await createStripeCheckoutSession({
    userId: payload.userId as string,
    items: payload.items as ICartItem[],
    totalAmount: payload.totalAmount as number,
  });

  // Create the order object in the database
  const newOrder = new Order({
    sessionId: session.sessionId,
    userId: payload.userId,
    items: payload.items,
    paymentStatus: 'pending',
    orderStatus: 'pending',
  });

  // Save the new order to the database
  await newOrder.save();

  return {
    checkoutUrl: session.checkoutUrl as string,
    sessionId: session.sessionId,
  };
};

// Handle Payment Success and Update Order
const handlePaymentSuccess = async (sessionId: string): Promise<IOrder> => {
  // Retrieve the Stripe session using the session ID
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Payment has not been successfully completed.'
    );
  } else if (session.status !== 'complete') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Payment session is not completed.'
    );
  }
  // Retrieve the payment intent details from Stripe
  const paymentIntent = await stripe.paymentIntents.retrieve(
    session.payment_intent as string
  );

  if (!paymentIntent) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Payment intent not found.');
  }
  // Find the order associated with the session ID
  const order = await Order.findOne({ sessionId: session.id });

  if (!order) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Order not found for the provided session.'
    );
  }
  order.paymentStatus = 'paid';
  order.totalAmount = paymentIntent?.amount / 100;
  if (session.shipping_details) {
    order.shippingAddress = {
      name: session.shipping_details.name!, // Assert that name is defined
      address: {
        city: session.shipping_details.address?.city!,
        country: session.shipping_details.address?.country!,
        line1: session.shipping_details.address?.line1!,
        postal_code: session.shipping_details.address?.postal_code!,
        line2: session.shipping_details.address?.line2!,
        state: session.shipping_details.address?.state!,
      },
    };
  }
  await order.save();
  const payment = await Payment.findOne({
    sessionId: session.id,
    paymentType: 'product',
  });
  if (!payment) {
    //crate payment
    await Payment.create({
      userId: order.userId,
      sessionId: order.sessionId,
      totalAmount: paymentIntent?.amount / 100,
      paymentHistory: paymentIntent,
      paymentStatus: 'pending',
      paymentType: 'product',
    });
  }
  return order;
};

//get all orders
const getAllOrders = async (
  filters: Partial<IOrder>,
  options: PaginateOptions
): Promise<PaginateResult<IOrder>> => {
  const sanitizedFilters = {
    ...filters,
    paymentStatus: 'paid',
  };

  options.populate = [
    {
      path: 'userId',
    },
  ];
  options.sortBy = '-createdAt';
  const orders = await Order.paginate(sanitizedFilters, options);
  return orders;
};

//get userBy order
const getUserOrders = async (
  filters: Partial<IOrder>,
  options: PaginateOptions
): Promise<PaginateResult<IOrder>> => {
  const sanitizedFilters = {
    ...filters,
    paymentStatus: 'paid',
  };

  options.populate = [
    {
      path: 'userId',
    },
  ];
  options.sortBy = '-createdAt';
  const orders = await Order.paginate(sanitizedFilters, options);
  return orders;
};
const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findById(id).populate('userId');
  if (!order) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found.');
  }
  return order;
};

const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<IOrder | null> => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found.');
  }
  order.orderStatus = status as TOrderStatus;
  await order.save();
  if (order.orderStatus === 'delivered') {
    const payment = await Payment.findOne({
      sessionId: order.sessionId,
      paymentType: 'product',
    });
    if (!payment) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Payment not found.');
    }
    payment.paymentStatus = 'succeeded';
    await payment.save();
  }
  return order;
};

export const OrderService = {
  createOrder,
  handlePaymentSuccess,
  getAllOrders,
  getUserOrders,
  getSingleOrder,
  updateOrderStatus,
};
