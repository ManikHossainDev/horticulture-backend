// orders.interface.ts
import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export type TOrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

export interface ICartItem {
  id: Types.ObjectId;
  name: string;
  price: number;
  totalPrice: number;
  image: string;
  size: string;
  color: string;
  category: string;
  quantity: number;
}

export interface IShippingAddress {
  name: string;
  address: {
    city: string;
    country: string;
    line1: string;
    line2?: string;
    postal_code: string;
    state?: string;
  };
}

export interface IOrder {
  sessionId?: string;
  userId: Types.ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: TOrderStatus;
  shippingAddress?: IShippingAddress;
}

export interface OrderModal extends Model<IOrder> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IOrder>>;
}
