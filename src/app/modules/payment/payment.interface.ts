import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IPayment {
  _id: string;
  userId: Types.ObjectId;
  sessionId: string;
  totalAmount: number;
  paymentHistory: Record<string, any>;
  paymentStatus: string;
  paymentType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentModal extends Model<IPayment> {
  paginate(
    filters: Record<string, any>,
    options: PaginateOptions
  ): Promise<PaginateResult<IPayment>>;
}
