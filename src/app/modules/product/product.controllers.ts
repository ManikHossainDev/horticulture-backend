import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { ProductService } from './product.services';
import sendResponse from '../../../shared/sendResponse';
import ApiError from '../../../errors/ApiError';
import pick from '../../../shared/pick';

interface MulterRequest extends Request {
  files?: Express.Multer.File[] | { [filename: string]: Express.Multer.File[] };
}

const createProductToDB = catchAsync(
  async (req: MulterRequest, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray(req.files)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Images are required');
    }
    // Convert uploaded files to image URLs
    const images = req.files.map(file => `/uploads/products/${file.filename}`);

    if (typeof req.body.sizes === 'string') {
      try {
        req.body.sizes = JSON.parse(req.body.sizes);
      } catch (error) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          'Invalid sizes format. Must be a valid JSON array.'
        );
      }
    }
    if (!Array.isArray(req.body.sizes)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Sizes must be an array.');
    }

    const productWithImages = {
      ...req.body,
      productImages: images,
    };

    const result = await ProductService.createProductToDB(productWithImages);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  }
);

const getAllProductsFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, [
    'searchTerm',
    'categoryName',
  ]);
  const options = pick(req.query, ['sortBy', 'page', 'limit', 'populate']);
  const result = await ProductService.getAllProductsFromDB(filters, options);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleProductFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getSingleProductFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  }
);
const updatedProductToDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (typeof req.body.sizes === 'string') {
    try {
      req.body.sizes = JSON.parse(req.body.sizes);
    } catch (error) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid sizes format. Must be a valid JSON array.'
      );
    }
  }
  if (!Array.isArray(req.body.sizes)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Sizes must be an array.');
  }
  const result = await ProductService.updateProductToDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const uploadProductImages = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.body;
  const newImages = req.files
    ? (req.files as Express.Multer.File[]).map(
        file => `/uploads/products/${file.filename}`
      )
    : [];
  const result = await ProductService.uploadProductImages(productId, newImages);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product images uploaded successfully',
    data: result,
  });
});

const singeProductImageDelete = catchAsync(
  async (req: Request, res: Response) => {
    const { id, imageName } = req.query;
    const result = await ProductService.singeProductImageDelete(
      id as string,
      imageName as string
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Product image deleted successfully',
      data: result,
    });
  }
);
const deleteProductToDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductService.deleteProductToDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product deleted successfully',
    data: {},
  });
});
export const ProductController = {
  createProductToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updatedProductToDB,
  uploadProductImages,
  singeProductImageDelete,
  deleteProductToDB,
};
