import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.services';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

const addService = catchAsync(async (req, res, next) => {
  if (!req.file) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Service image is required');
  }
  if (req.file) {
    req.body.serviceImage = '/uploads/services/' + req.file.filename;
  }
  const result = await ServiceService.addService(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Service added successfully',
    data: result,
  });
});

const getServices = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'categoryName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await ServiceService.getAllServices(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await ServiceService.getSingleService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});
const updateService = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    req.body.serviceImage = '/uploads/services/' + req.file.filename;
  }
  const result = await ServiceService.updateService(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await ServiceService.deleteService(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Service deleted successfully',
    data: {},
  });
});

export const ServiceController = {
  addService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
};
