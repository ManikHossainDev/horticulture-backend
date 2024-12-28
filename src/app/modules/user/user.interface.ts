import { Model, Types } from 'mongoose';
import { Role } from '../../middlewares/roles';
import { TUserStatus } from './user.constant';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';

export type TUser = {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  image: string;
  subscription: Types.ObjectId | null;
  subscriptionStartDate: Date | null;
  subscriptionExpiryDate: Date | null;
  status: TUserStatus;
  isSubscribed: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  isNewsletterSubscribed: boolean;
  isEmailVerified: boolean;
  isResetPassword: boolean;
  oneTimeCode?: string | null;
  oneTimeCodeExpire?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModal extends Model<TUser> {
  paginate: (
    filter: object,
    options: PaginateOptions
  ) => Promise<PaginateResult<TUser>>;
  isExistUserById(id: string): Promise<Partial<TUser> | null>;
  isExistUserByEmail(email: string): Promise<Partial<TUser> | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}
