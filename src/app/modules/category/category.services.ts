import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { ICategory } from './category.interface';
import Category from './category.model';

const createCategoryToDB = async (category: Partial<ICategory>) => {
  const newCategory = await Category.create(category);
  return newCategory;
};

const getAllCategoriesFromDB = async (
  filters: Partial<ICategory>,
  options: PaginateOptions
): Promise<PaginateResult<ICategory>> => {
  const sanitizedFilters = {
    ...filters,
    isDeleted: false,
  };
  const categories = await Category.paginate(sanitizedFilters, options);
  return categories;
};

const getSingleCategoryFromDB = async (id: string) => {
  const category = await Category.findOne({ _id: id, isDeleted: false });
  if (!category) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category not found');
  }
  return category;
};
const updateCategoryToDB = async (id: string, payload: Partial<ICategory>) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (!updatedCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category not found');
  }
  return updatedCategory;
};

const deleteCategoryToDB = async (id: string) => {
  const category = await Category.findOne({ _id: id, isDeleted: false });
  if (!category) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category not found');
  }
  category.isDeleted = true;
  await category.save();
  return category;
};

export const CategoryService = {
  createCategoryToDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryToDB,
  deleteCategoryToDB,
};
