import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { NewsLetterService } from './newsLetter.service';

const joinNewsletter = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const result = await NewsLetterService.joinNewsletter(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscribed to newsletter successfully.',
    data: result,
  });
});

const sendNewsLetterMessage = catchAsync(async (req, res, next) => {
  const { subject, content } = req.body;
  const result = await NewsLetterService.sendNewsLetterMessage(
    subject,
    content
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Newsletter message sent successfully.',
    data: result,
  });
});

export const NewsLetterController = {
  joinNewsletter,
  sendNewsLetterMessage,
};
