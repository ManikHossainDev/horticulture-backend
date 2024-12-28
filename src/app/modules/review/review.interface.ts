import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IReview {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  comment: {
    text: string;
    image?: string;
  };
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewModal extends Model<IReview> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IReview>>;
}
