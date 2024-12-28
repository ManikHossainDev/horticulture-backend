import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { TermsConditionsService } from './termsConditions.service';

const createOrUpdateTermsConditions = catchAsync(async (req, res, next) => {
  const result = await TermsConditionsService.createOrUpdateTermsConditions(
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'TermsConditions updated successfully',
    data: result,
  });
});

const getTermsConditions = catchAsync(async (req, res, next) => {
  const result = await TermsConditionsService.getTermsConditions();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'TermsConditions fetched successfully',
    data: result,
  });
});

export const TermsConditionsController = {
  createOrUpdateTermsConditions,
  getTermsConditions,
};
