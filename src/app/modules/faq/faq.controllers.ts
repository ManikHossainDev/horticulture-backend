import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { FaqService } from './faq.services';
import pick from '../../../shared/pick';

const createFaq = catchAsync(async (req, res, next) => {
  const result = await FaqService.createFaq(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Faq added successfully',
    data: result,
  });
});

const getFaqs = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'categoryName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await FaqService.getAllFaqs(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faq retrieved successfully',
    data: result,
  });
});

const getSingleFaq = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await FaqService.getFaqById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faq retrieved successfully',
    data: result,
  });
});

const updateFaq = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FaqService.updateFaq(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faq updated successfully',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await FaqService.deleteFaq(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faq deleted successfully',
  });
});

export const FaqController = {
  createFaq,
  getFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
};
