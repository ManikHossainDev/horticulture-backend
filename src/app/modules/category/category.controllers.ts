import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.services';
import pick from '../../../shared/pick';

const createCategoryToDB = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.categoryImage = '/uploads/categories/' + req.file.filename;
  }
  const result = await CategoryService.createCategoryToDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategoriesFromDB = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, ['searchTerm', 'categoryName']);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await CategoryService.getAllCategoriesFromDB(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

const getSingleCategoryFromDB = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await CategoryService.getSingleCategoryFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateCategoryToDB = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (req.file) {
    req.body.categoryImage = '/uploads/categories/' + req.file.filename;
  }

  const result = await CategoryService.updateCategoryToDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategoryFromDB = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await CategoryService.deleteCategoryToDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category deleted successfully',
    data: {},
  });
});

export const CategoryController = {
  createCategoryToDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryToDB,
  deleteCategoryFromDB,
};
