import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { PrivacyPolicyService } from './privacyPolicy.service';

const createOrUpdatePrivacyPolicy = catchAsync(async (req, res, next) => {
  const result = await PrivacyPolicyService.createOrUpdatePrivacyPolicy(
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Privacy Policy updated successfully',
    data: result,
  });
});

const getPrivacyPolicy = catchAsync(async (req, res, next) => {
  const result = await PrivacyPolicyService.getPrivacyPolicy();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Privacy Policy fetched successfully',
    data: result,
  });
});

export const PrivacyPolicyController = {
  createOrUpdatePrivacyPolicy,
  getPrivacyPolicy,
};
