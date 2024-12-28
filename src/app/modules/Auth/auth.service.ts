import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import bcrypt from 'bcrypt';
import {
  IChangePassword,
  ILogin,
  IResetPassword,
  IVerifyEmail,
} from '../../../types/auth';
import { sendResetPasswordEmail } from '../../../helpers/emailHelper';
import { Secret } from 'jsonwebtoken';
import createOtp from './createOtp';

// Helper function for user status validation
const validateUserStatus = (user: any) => {
  if (user.isDeleted) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your account has been deleted.'
    );
  }
  if (user.isBlocked) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Your account is blocked.');
  }
};

const loginIntoDB = async (payload: ILogin) => {
  const user = await User.findOne({
    email: payload.email,
    isEmailVerified: true,
  }).select('+password')

  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }
  validateUserStatus(user);
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'The password you entered is incorrect. Please check and try again.'
    );
  }
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }
  const { password, ...userWithoutPassword } = user.toObject();

  const accessTokenPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelper.createToken(
    accessTokenPayload,
    config.jwt.accessSecret as Secret,
    config.jwt.accessExpirationTime
  );
  const refreshToken = jwtHelper.createToken(
    accessTokenPayload,
    config.jwt.accessSecret as Secret,
    config.jwt.refreshExpirationTime
  );

  return {
    user: userWithoutPassword,
    tokens: {
      accessToken,
      refreshToken,
    },
  };
};

const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email, isEmailVerified: true });
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }
  validateUserStatus(user);

  const { oneTimeCode, oneTimeCodeExpire } = createOtp();
  user.isResetPassword = true;
  user.oneTimeCode = oneTimeCode;
  user.oneTimeCodeExpire = oneTimeCodeExpire;

  await user.save();
  await sendResetPasswordEmail(user.email, oneTimeCode);

  return {
    message:
      'A reset password email has been sent to your registered email address.',
  };
};

const verifyEmail = async (payload: IVerifyEmail) => {
  const { email, oneTimeCode } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'No account found with this email address. Please check and try again.'
    );
  }

  if (user.oneTimeCode !== String(oneTimeCode) || !user.oneTimeCodeExpire) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'The OTP provided is invalid. Please check and try again.'
    );
  }
  if (new Date() > new Date(user.oneTimeCodeExpire)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'The OTP has expired. Please request a new one.'
    );
  }
  if (user.isEmailVerified && !user.isResetPassword) {
    user.isEmailVerified = true;
    user.oneTimeCode = null;
    user.oneTimeCodeExpire = null;
    await user.save();
    return;
  }
  if (user.isEmailVerified && user.isResetPassword) {
    user.isEmailVerified = true;
    user.isResetPassword = false;
    user.oneTimeCode = null;
    user.oneTimeCodeExpire = null;
    await user.save();
    return;
  }
  user.isEmailVerified = true;
  user.isResetPassword = false;
  user.oneTimeCode = null;
  user.oneTimeCodeExpire = null;
  await user.save();

  return user;
};

const resetPassword = async (payload: IResetPassword) => {
  const { email, newPassword } = payload;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }
  validateUserStatus(user);

  user.password = newPassword;
  await user.save();

  return user;
};

const changePassword = async (userId: string, payload: IChangePassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }
  validateUserStatus(user);
  if (payload.currentPassword === payload.newPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your new password cannot be the same as the current password. Please choose a different password.'
    );
  }
  const isCurrentPasswordValid = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isCurrentPasswordValid) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your current password is incorrect.'
    );
  }
  user.password = payload.newPassword;
  await user.save();

  return user;
};

const refreshToken = async (refreshToken: string) => {
  console.log(refreshToken)
  const decoded = jwtHelper.verifyToken(
    refreshToken,
    config.jwt.accessSecret as Secret
  );

  const user = await User.findById(decoded.id).select('+password');

  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found.');
  }

  const accessTokenPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtHelper.createToken(
    accessTokenPayload,
    config.jwt.accessSecret as Secret,
    config.jwt.accessExpirationTime
  );

  return {
    accessToken,
  };
};
export const AuthService = {
  loginIntoDB,
  verifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  refreshToken
};
