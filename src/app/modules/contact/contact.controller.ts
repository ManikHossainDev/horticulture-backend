import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.services';

const createContactToAdmin = catchAsync(async (req, res, next) => {
  const result = await ContactService.createContactToAdmin(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Contact added successfully',
    data: result,
  });
});

export const ContactController = {
  createContactToAdmin,
};