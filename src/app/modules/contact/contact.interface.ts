import { Model } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IContact {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export interface IContactModal extends Model<IContact> {
  paginate(
    filters: object,
    options: PaginateOptions
  ): Promise<PaginateResult<IContact>>;
}
