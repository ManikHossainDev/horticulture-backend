import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.services';

const addReview = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  req.body.userId = userId;
  const result = await ReviewService.addReview(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await ReviewService.updateReview(req.user.id, id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const updateLikesDislikes = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.body;
  const result = await ReviewService.updateLikesDislikes(id, type);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

export const ReviewController = {
  addReview,
  updateReview,
  updateLikesDislikes,
};
