// handleDuplicateError.ts
import { IErrorMessage } from '../types/errors.types';

const handleDuplicateError = (error: any) => {
  const errorMessages: IErrorMessage[] = [
    {
      path: error.keyValue ? Object.keys(error.keyValue)[0] : 'unknown',
      message: `${Object.keys(error.keyValue)[0]} already exists`,
    },
  ];

  const statusCode = 409;
  return {
    statusCode,
    message: 'Duplicate entry detected',
    errorMessages,
  };
};

export default handleDuplicateError;
