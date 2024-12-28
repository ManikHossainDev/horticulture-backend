import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CompanyService } from './company.service';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

const addedCompany = catchAsync(async (req, res, next) => {
  const authorId = req.user.id;

  // Check if images are provided
  if (!req.files || !Array.isArray(req.files)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Company images are required');
  }

  // Convert uploaded files to image URLs
  const images = req.files.map(file => `/uploads/company/${file.filename}`);

  // Parse companyLocation if it's a string
  if (typeof req.body.companyLocation === 'string') {
    try {
      req.body.companyLocation = JSON.parse(req.body.companyLocation); // Convert string to object
    } catch (error) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid companyLocation format. Must be a valid JSON object.'
      );
    }
  }

  if (typeof req.body.companyInformation === 'string') {
    try {
      req.body.companyInformation = JSON.parse(req.body.companyInformation);
    } catch (error) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid companyInformation format. Must be a valid JSON object.'
      );
    }
  }

  // Add images and authorId to the request body
  const companyDetailsWithImages = {
    ...req.body,
    authorId,
    companyImages: images,
  };

  // Call the service to save the company details
  const result = await CompanyService.addedCompany(companyDetailsWithImages);

  // Send the success response
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Company added successfully',
    data: result,
  });
});

const getAllCompanies = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, [
    'searchTerm',
    'city',
    'zipCode',
    'state',
    'country',
    'companyType',
  ]);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);

  // Call the service to get the companies with filters and options
  const result = await CompanyService.getAllCompanies(filters, options);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Companies retrieved successfully',
    data: result,
  });
});

const getMyCompanies = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'companyName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const authorId = req.user.id;
  const result = await CompanyService.getMyCompanies(
    filters,
    options,
    authorId
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'My companies retrieved successfully',
    data: result,
  });
});

const getSingleCompany = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await CompanyService.getSingleCompany(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company retrieved successfully',
    data: result,
  });
});

const updateCompany = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  // Parse companyLocation if it's a string
  if (typeof req.body.companyLocation === 'string') {
    try {
      req.body.companyLocation = JSON.parse(req.body.companyLocation); // Convert string to object
    } catch (error) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid companyLocation format. Must be a valid JSON object.'
      );
    }
  }

  if (typeof req.body.companyInformation === 'string') {
    try {
      req.body.companyInformation = JSON.parse(req.body.companyInformation);
    } catch (error) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid companyInformation format. Must be a valid JSON object.'
      );
    }
  }
  const result = await CompanyService.updateCompany(id, userId, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company updated successfully',
    data: result,
  });
});

//const updateCompanyImages
const updateCompanyImages = catchAsync(async (req, res, next) => {
  const { companyId } = req.body;
  const newImages = req.files
    ? (req.files as Express.Multer.File[]).map(
        file => `/uploads/company/${file.filename}`
      )
    : [];

  const result = await CompanyService.uploadCompanyImages(companyId, newImages);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company images updated successfully',
    data: result,
  });
});

//delete company image
const singeCompanyImageDelete = catchAsync(async (req, res, next) => {
  const { id, imageName } = req.query;
  const result = await CompanyService.singeCompanyImageDelete(
    id as string,
    imageName as string
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company image deleted successfully',
    data: result,
  });
});
const deleteCompany = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;
  const result = await CompanyService.deleteCompany(id, userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Company deleted successfully',
    data: result,
  });
});

export const CompanyController = {
  addedCompany,
  getAllCompanies,
  getMyCompanies,
  getSingleCompany,
  updateCompany,
  updateCompanyImages,
  singeCompanyImageDelete,
  deleteCompany,
};
