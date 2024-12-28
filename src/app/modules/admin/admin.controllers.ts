import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { AdminServices } from './admin.services';
import sendResponse from '../../../shared/sendResponse';
import ApiError from '../../../errors/ApiError';

const getDashboardData = catchAsync(async (req, res, next) => {
  const result = await AdminServices.getDashboardData();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Dashboard data retrieved successfully',
    data: result,
  });
});

const earningsGraphChart = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  if (!year) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Year is required');
    return;
  }
  const result = await AdminServices.earningsGraphChart(Number(year));
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Earnings graph chart retrieved successfully',
    data: result,
  });
});

export const AdminController = {
  getDashboardData,
  earningsGraphChart,
};
