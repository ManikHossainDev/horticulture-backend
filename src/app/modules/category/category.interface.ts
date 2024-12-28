import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface ICategory {
  _id: Types.ObjectId;
  categoryName: string;
  categoryImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryModal extends Model<ICategory> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<ICategory>>;
}
