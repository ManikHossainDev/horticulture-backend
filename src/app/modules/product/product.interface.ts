import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface ISize {
  size: string;
  price: number;
  colors?: string[];
  // quantity: number;
}

export interface IProduct {
  _id: Types.ObjectId;
  productName: string;
  productDescription: string;
  productImages: string[];
  sizes: ISize[];
  // inStock: boolean;
  category: string;
  avgReview: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductModal extends Model<IProduct> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IProduct>>;
}
