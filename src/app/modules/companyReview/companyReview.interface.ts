import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface ICompanyReview {
  _id: string;
  userId: Types.ObjectId;
  companyId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICompanyReviewModal extends Model<ICompanyReview> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<ICompanyReview>>;
}
