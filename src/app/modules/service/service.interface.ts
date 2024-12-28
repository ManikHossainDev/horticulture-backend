import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface IService {
  _id: Types.ObjectId;
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceModal extends Model<IService> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<IService>>;
}
