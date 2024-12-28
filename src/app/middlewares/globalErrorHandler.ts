import { ErrorRequestHandler } from 'express';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import { errorLogger } from '../../shared/logger';
import { IErrorMessage } from '../../types/errors.types';


const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // Log error
  config.env === 'development'
    ? console.log('🚨 globalErrorHandler ~~ ', error)
    : errorLogger.error('🚨 globalErrorHandler ~~ ', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IErrorMessage[] = [];
  let icon = '❌'; // Default icon

  // Handle ZodError
  if (error.name === 'ZodError') {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = `${simplifiedError.errorMessages
      .map(err => err.message)
      .join(', ')}`;
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle ValidationError (e.g., Mongoose)
  else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = `${simplifiedError.errorMessages
      .map(err => err.message)
      .join(', ')}`;
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle DuplicateError (e.g., from database unique constraint violation)
  else if (error.name === 'DuplicateError') {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = `${simplifiedError.errorMessages
      .map(err => err.message)
      .join(', ')}`;
    errorMessages = simplifiedError.errorMessages;
  }
  // Handle ApiError (custom error type)
  else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message || 'Something went wrong';
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }
  // Handle other general errors
  else if (error instanceof Error) {
    message = error.message || 'Internal Server Error';
    errorMessages = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : [];
  }

  // Format multiple error messages as a comma-separated list in the message field
  const formattedMessage =
    errorMessages.length > 1
      ? errorMessages.map(err => err.message).join(', ')
      : message;

  // Send response with statusCode, success, message, and error
  res.status(statusCode).json({
    statusCode, // Include statusCode
    success: false, // success status
    message: `${formattedMessage}`, // Message with icon
    error: errorMessages, // Error details (path and message)
    stack: config.env === 'development' ? error?.stack : undefined, // Stack trace in development mode
  });
};

export default globalErrorHandler;
