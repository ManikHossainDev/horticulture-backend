import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import BannerImageService from './banner.service';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

const addBannerImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Banner image is required');
  }
  if (req.file) {
    req.body.bannerImage = '/uploads/banners/' + req.file.filename;
  }
  const result = await BannerImageService.addBannerImage(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Banner image added successfully',
    data: result,
  });
});

const getBannerImages = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'categoryName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await BannerImageService.getBannerImages(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner images retrieved successfully',
    data: result,
  });
});

const getSingleBannerImage = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await BannerImageService.getSingleBannerImage(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner image retrieved successfully',
    data: result,
  });
});
const updateBannerImage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    req.body.bannerImage = '/uploads/banners/' + req.file.filename;
  }
  const result = await BannerImageService.updateBannerImage(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner image updated successfully',
    data: result,
  });
});

const deleteBannerImage = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await BannerImageService.deleteBannerImage(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Banner image deleted successfully',
    data: {},
  });
});

export const BannerImageController = {
  addBannerImage,
  getBannerImages,
  getSingleBannerImage,
  updateBannerImage,
  deleteBannerImage,
};
