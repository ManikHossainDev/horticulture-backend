import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { IProduct } from './product.interface';
import Product from './product.model';
import Review from '../review/review.model';
interface ISanitizedFilters {
  [key: string]: any;
}
const createProductToDB = async (
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (
  filters: Record<string, any>,
  options: PaginateOptions
): Promise<PaginateResult<IProduct>> => {
  const sanitizedFilters: ISanitizedFilters = {
    isDeleted: false,
  };

  if (filters.searchTerm) {
    const searchRegex = {
      $regex: filters.searchTerm,
      $options: 'i',
    };
    sanitizedFilters['$or'] = [
      { productName: searchRegex },
      { productDescription: searchRegex },
      { category: searchRegex },
    ];
  }
  // If categoryName filter is present, add it to sanitizedFilters
  if (filters.categoryName) {
    sanitizedFilters['category'] = {
      $regex: filters.categoryName,
      $options: 'i',
    };
  }

  // Query the database using the sanitized filters
  const products = await Product.paginate(sanitizedFilters, options);
  return products;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product not found');
  }
  const relatedProducts = await Product.find({
    _id: { $ne: id },
    category: product.category,
    isDeleted: false,
  });
  const reviews = await Review.find({ productId: id }).populate('userId');

  return { product, reviews, relatedProducts };
};

const updateProductToDB = async (
  id: string,
  payload: Partial<IProduct>
): Promise<IProduct | null> => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new Error('Product not found');
  }
  Object.assign(product, payload);
  await product.save();
  return product;
};

const uploadProductImages = async (id: string, newImages: string[]) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Product Not Found');
  }
  if (newImages.length > 0) {
    product.productImages = [...product.productImages, ...newImages];
  }
  await product.save();
  return product;
};
const singeProductImageDelete = async (id: string, imageName: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  product.productImages = product.productImages.filter(
    img => img !== imageName
  );
  await product.save();
  return product;
};

const deleteProductToDB = async (id: string): Promise<IProduct | null> => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new Error('Product not found');
  }

  product.isDeleted = true;
  await product.save();
  return product;
};

export const ProductService = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductToDB,
  deleteProductToDB,
  uploadProductImages,
  singeProductImageDelete,
};
