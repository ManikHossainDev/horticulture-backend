import { model, Schema } from 'mongoose';
import { ITermsConditions } from './termsConditions.interface';

const termsConditionsSchema = new Schema<ITermsConditions>(
  {
    termsConditions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TermsConditions = model<ITermsConditions>(
  'TermsConditions',
  termsConditionsSchema
);
