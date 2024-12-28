import { model, Schema } from 'mongoose';
import { IPrivacyPolicy } from './privacyPolicy.interface';

const privacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    privacyPolicy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PrivacyPolicy = model<IPrivacyPolicy>(
  'PrivacyPolicy',
  privacyPolicySchema
);
