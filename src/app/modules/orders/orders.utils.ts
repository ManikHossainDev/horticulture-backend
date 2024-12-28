import Stripe from 'stripe';
import { ICartItem } from './orders.interface';
import config from '../../../config';
import { User } from '../user/user.model';

export const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: '2024-11-20.acacia', // Ensure this matches your API version
  typescript: true,
});

const createStripeCheckoutSession = async (checkoutData: {
  userId: string;
  items: ICartItem[];
  totalAmount: number;
}) => {
  const user = await User.findById(checkoutData.userId);
  const { items, totalAmount } = checkoutData;

  const shippingFee = 500;
  const taxRate = 0.1;
  const taxAmount = totalAmount * taxRate;

  // Create the Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item: ICartItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    })),
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: shippingFee, currency: 'usd' },
          display_name: 'Shipping Fee',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    mode: 'payment',
    success_url: `${config.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.cancelUrl}`,
    customer_email: user?.email,
    metadata: {
      totalAmount: totalAmount.toString(),
      shippingFee: shippingFee.toString(),
      taxAmount: taxAmount.toString(),
    },
    shipping_address_collection: {
      allowed_countries: ['US', 'GB', 'BD', 'CA'],
    },
  });

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
  };
};

export default createStripeCheckoutSession;
