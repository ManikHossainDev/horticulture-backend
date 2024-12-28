import { ITermsConditions } from './termsConditions.interface';
import { TermsConditions } from './termsConditions.model';

const createOrUpdateTermsConditions = async (
  payload: Partial<ITermsConditions>
) => {
  const existingTermsConditions = await TermsConditions.findOne();

  if (existingTermsConditions) {
    existingTermsConditions.set(payload);
    await existingTermsConditions.save();
    return existingTermsConditions;
  } else {
    const newTermsConditions = await TermsConditions.create(payload);
    return newTermsConditions;
  }
};

const getTermsConditions = async () => {
  const result = await TermsConditions.findOne().sort({ createdAt: -1 });
  return result;
};

export const TermsConditionsService = {
  createOrUpdateTermsConditions,
  getTermsConditions,
};
