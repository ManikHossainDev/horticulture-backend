import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const isUserExist = await User.findOne({ email: userData?.email });

    if (isUserExist) {
      if (!isUserExist.isEmailVerified) {
        const result = await UserService.isUpdateUser(isUserExist.email);

        return sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message:
            'OTP sent to your email, please verify your email within the next 3 minutes.',
          data: result,
        });
      } else {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User already exists');
      }
    }

    await UserService.createUserToDB(userData);
    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message:
        'Thank you for registering. Please verify your email within the next 3 minutes.',
      data: {},
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', 'email', 'role', 'fullName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const users = await UserService.getAllUsersFromDB(filters, options);

  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully.',
    data: users,
  });
});

const getSingleUserFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUserFromDB(id);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User retrieved successfully.',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getMyProfile(req.user.id);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully.',
    data: result,
  });
});
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await UserService.updateMyProfile(userId, req.body);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User updated successfully.',
    data: result,
  });
});
const updateUserImage = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  if (req.file) {
    req.body.image = '/uploads/users/' + req.file.filename; 
  }
  const result = await UserService.updateMyProfile(userId, req.body);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User Image updated successfully.',
    data: result,
  });
})

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { action } = req.body;
  const result = await UserService.changeUserStatus(userId, action);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User status updated successfully.',
    data: result,
  });
});
const deleteMyProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  await UserService.deleteMyProfile(userId);
  return sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully.',
    data: {},
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUserImage,
  getSingleUserFromDB,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  changeUserStatus,
};
