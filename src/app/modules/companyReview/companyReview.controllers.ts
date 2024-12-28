import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CompanyReviewService } from './companyReview.service';

const addCompanyReview = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  req.body.userId = userId;
  const result = await CompanyReviewService.addCompanyReview(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const updateCompanyReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await CompanyReviewService.updateCompanyReview(
    req.user.id,
    id,
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

export const CompanyReviewController = {
  addCompanyReview,
  updateCompanyReview,
};
