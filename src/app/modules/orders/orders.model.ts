// orders.model.ts

import mongoose, { Schema } from 'mongoose';
import {
  ICartItem,
  IOrder,
  IShippingAddress,
  OrderModal,
} from './orders.interface';
import paginate from '../plugins/paginate';

const cartItemSchema = new Schema<ICartItem>({
  id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  category: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const shippingAddressSchema = new Schema<IShippingAddress>({
  name: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    postal_code: { type: String, required: true },
    state: { type: String },
  },
});

const orderSchema = new Schema<IOrder>(
  {
    sessionId: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: false },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    shippingAddress: shippingAddressSchema,
  },
  { timestamps: true }
);

orderSchema.plugin(paginate);

export const Order = mongoose.model<IOrder, OrderModal>('Order', orderSchema);
