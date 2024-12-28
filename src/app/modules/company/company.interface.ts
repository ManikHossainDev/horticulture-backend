import { Model, Types } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export interface ICompany {
  _id: string;
  companyName: string;
  companyLocation: {
    latitude: number;
    longitude: number;
  };
  companyType: string;
  authorId: Types.ObjectId;
  companyAbout: string;
  companyImages: string[];
  companyInformation: {
    companyDescription: string;
    contactNumber: string;
    email: string;
    website?: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  avgRating: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyModal extends Model<ICompany> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<ICompany>>;
}
