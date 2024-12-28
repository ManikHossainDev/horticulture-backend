import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaymentService } from './payment.service';
import pick from '../../../shared/pick';


const getAllPayments = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'userName', 'productName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await PaymentService.getAllPayments(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Payment retrieved successfully',
    data: result,
  });
});

export const PaymentController = {
  getAllPayments,
};
