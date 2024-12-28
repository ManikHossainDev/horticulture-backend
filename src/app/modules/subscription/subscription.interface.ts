import { Model } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface ISubscription {
  _id: string;
  name: string;
  duration: number;
  price: number;
  maxListings: string;
  benefits: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriptionModal extends Model<ISubscription> {
  paginate(
    filters: object,
    options: PaginateOptions
  ): Promise<PaginateResult<ISubscription>>;
}
