import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Secret, TokenExpiredError } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';
import { roleRights } from './roles';
import { User } from '../modules/user/user.model';

const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Step 1: Get Authorization Header
      const tokenWithBearer = req.headers.authorization; 
      if (!tokenWithBearer) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }

      if (tokenWithBearer.startsWith('Bearer')) {
        const token = tokenWithBearer.split(' ')[1];
        try {
          // Step 2: Verify Token
          const verifyUser = jwtHelper.verifyToken(
            token,
            config.jwt.accessSecret as Secret
          );

          // Step 3: Attach user to the request object
          req.user = verifyUser;

          // Step 4: Check if the user exists and is active
          const user = await User.findById(verifyUser.id);
          if (!user) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
          } else if (user.isDeleted) {
            throw new ApiError(
              StatusCodes.BAD_REQUEST,
              'Your account has been deleted.'
            );
          } else if (user.isBlocked) {
            throw new ApiError(
              StatusCodes.BAD_REQUEST,
              'Your account is blocked.'
            );
          } else if (!user.isEmailVerified) {
            throw new ApiError(
              StatusCodes.BAD_REQUEST,
              'Your account is not verified.'
            );
          }else if(user.subscription){
            
          }

          // Step 5: Role-based Authorization
          if (roles.length) {
            const userRole = roleRights.get(verifyUser?.role);
            const hasRole = userRole?.some(role => roles.includes(role));
            if (!hasRole) {
              throw new ApiError(
                StatusCodes.FORBIDDEN,
                "You don't have permission to access this API"
              );
            }
          }

          next();
        } catch (err) {
          // Handle Token Errors
          if (err instanceof TokenExpiredError) {
            throw new ApiError(
              StatusCodes.UNAUTHORIZED,
              'Your session has expired. Please log in again.'
            );
          } else {
            throw new ApiError(
              StatusCodes.UNAUTHORIZED,
              'Invalid token. Please log in again.'
            );
          }
        }
      } else {
        // If the token format is incorrect
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token format');
      }
    } catch (error) {
      next(error);  // Pass error to next middleware (usually the error handler)
    }
  };

export default auth;
