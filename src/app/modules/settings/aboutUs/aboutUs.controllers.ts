import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { AboutUsService } from './aboutUs.service';

const createOrUpdateAboutUs = catchAsync(async (req, res, next) => {
  const result = await AboutUsService.createOrUpdateAboutUs(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'About us updated successfully',
    data: result,
  });
});

const getAboutUs = catchAsync(async (req, res, next) => {
  const result = await AboutUsService.getAboutUs();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'About us fetched successfully',
    data: result,
  });
});

export const AboutUsController = {
  createOrUpdateAboutUs,
  getAboutUs,
};
