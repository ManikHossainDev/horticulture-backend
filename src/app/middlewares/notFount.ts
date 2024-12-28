import { NextFunction, Request, Response } from 'express';
import status from 'http-status-codes';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const errorDetails = {
    success: false,
    message: `The requested ${req.originalUrl} endpoint not found!`,
    error: `The requested ${req.originalUrl} endpoint does not exist on this server.`,
  };
  // Send a detailed response for easier debugging
  res.status(status.NOT_FOUND).json(errorDetails);
};

export default notFound;
