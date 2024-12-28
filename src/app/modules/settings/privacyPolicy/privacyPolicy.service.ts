import { IPrivacyPolicy } from "./privacyPolicy.interface";
import { PrivacyPolicy } from "./privacyPolicy.model";

const createOrUpdatePrivacyPolicy = async (payload: Partial<IPrivacyPolicy>) => {
  const existingPrivacyPolicy = await PrivacyPolicy.findOne();

  if (existingPrivacyPolicy) {
    existingPrivacyPolicy.set(payload);
    await existingPrivacyPolicy.save();
    return existingPrivacyPolicy;
  } else {
    const newPrivacyPolicy = await PrivacyPolicy.create(payload);
    return newPrivacyPolicy;
  }
};

const getPrivacyPolicy = async () => {
  const result = await PrivacyPolicy.findOne().sort({ createdAt: -1 });
  return result;
};

export const PrivacyPolicyService = {
  createOrUpdatePrivacyPolicy,
  getPrivacyPolicy,
};
