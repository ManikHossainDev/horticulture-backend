import { Response } from 'express';

type IData<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: IData<T>) => {
  const resData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: {
      attributes: data.data,
    },
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
