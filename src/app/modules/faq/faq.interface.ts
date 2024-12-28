import { Model } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFaqModal extends Model<IFaq> {
  paginate(
    filters: object,
    options: PaginateOptions
  ): Promise<PaginateResult<IFaq>>;
}
