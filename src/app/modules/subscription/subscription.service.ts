import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { ISubscription } from './subscription.interface';
import Subscription from './subscription.model';
import { User } from '../user/user.model';
import { stripe } from '../orders/orders.utils';
import { Payment } from '../payment/payment.model';
import config from '../../../config';

const createSubscription = async (payload: Partial<ISubscription>) => {
  const newSubscription = await Subscription.create(payload);
  return newSubscription;
};

//purchase a subscription
const purchaseSubscription = async (userId: string, subscriptionId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const subscription = await Subscription.findById(subscriptionId);
  if (!subscription) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription not found');
  }
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: subscription?.name,
          },
          unit_amount: subscription?.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${config.successSubscriptionUrl}?session_id={CHECKOUT_SESSION_ID}&subscriptionId=${subscriptionId}`,
    cancel_url: `${config.cancelSubscriptionUrl}`,
    customer_email: user.email,
  });
  return session.url;
};

//complete subscription payment
const completeSubscriptionPayment = async (
  sessionId: string,
  subscriptionId: string
) => {
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

  // Find the subscription plan based on the subscriptionId
  const subscriptionPlan = await Subscription.findById(subscriptionId);

  if (!subscriptionPlan) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription plan not found');
  }

  //updated user
  const user = await User.findOne({ email: session.customer_email });
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isExistingPayment = await Payment.findOne({
    sessionId,
    paymentType: 'subscription',
  });
  if (!isExistingPayment) {
    //crate payment
    await Payment.create({
      userId: user?._id,
      sessionId,
      totalAmount: paymentIntent?.amount / 100,
      paymentHistory: paymentIntent,
      paymentStatus: paymentIntent.status,
      paymentType: 'subscription',
    });
  }
  // Update user's subscription
  user.subscription = subscriptionPlan.id;
  user.subscriptionStartDate = new Date();
  user.subscriptionExpiryDate = new Date(
    new Date().setMonth(new Date().getMonth() + subscriptionPlan.duration)
  );
  user.isSubscribed = true;
  await user.save();

  return user;
};

const getAllSubscriptions = async (
  filters: Partial<ISubscription>,
  options: PaginateOptions
): Promise<PaginateResult<ISubscription>> => {
  const sanitizedFilters = {
    ...filters,
    isDeleted: false,
  };
  const subscriptions = await Subscription.paginate(sanitizedFilters, options);
  return subscriptions;
};

const getSubscriptionById = async (
  id: string
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription not found');
  }
  return subscription;
};

const updateSubscription = async (
  id: string,
  payload: Partial<ISubscription>
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription not found');
  }
  const updatedSubscription = await Subscription.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return updatedSubscription;
};

const deleteSubscription = async (
  id: string
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findById(id);
  if (!subscription) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Subscription not found');
  }
  subscription.isDeleted = true;
  await subscription.save();
  return subscription;
};

export const SubscriptionService = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  purchaseSubscription,
  completeSubscriptionPayment,
};
