import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

//login
const loginIntoDB = catchAsync(async (req, res, next) => {
  const result = await AuthService.loginIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successful',
    data: result,
  });
});

//forgot password
const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  await AuthService.forgotPassword(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:
      'OTP sent to your email, please verify your email within the next 3 minutes',
    data: {},
  });
});

//verify email
const verifyEmail = catchAsync(async (req, res, next) => {
  const verifyData = req.body;
  const result = await AuthService.verifyEmail(verifyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Verify Email Successful',
    data: result,
  });
});

//reset password
const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordData = req.body;
  await AuthService.resetPassword(resetPasswordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset Password Successful',
    data: {},
  });
});

//change password
const changePassword = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const changePasswordData = req.body;
  const result = await AuthService.changePassword(userId, changePasswordData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Change Password Successful',
    data: result,
  });
});

//refresh token
const refreshToken = catchAsync(async (req, res, next) => {
  console.log(req.cookies);
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  res.cookie('refreshToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successful',
    data: result,
  });
});
export const AuthController = {
  loginIntoDB,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken,
};
