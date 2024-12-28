import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controllers';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';
import { CategoryValidation } from './category.validation';
import validateRequest from '../../middlewares/validateRequest';

const UPLOADS_FOLDER = 'uploads/categories';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = Router();

router
  .route('/')
  .get(CategoryController.getAllCategoriesFromDB)
  .post(
    auth('admin'),
    upload.single('categoryImage'),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    validateRequest(CategoryValidation.createCategoryValidationSchema),
    CategoryController.createCategoryToDB
  );

router
  .route('/:id')
  .get(CategoryController.getSingleCategoryFromDB)
  .delete(auth('admin'), CategoryController.deleteCategoryFromDB)
  .patch(
    auth('admin'),
    upload.single('categoryImage'),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    validateRequest(CategoryValidation.updateCategoryValidationSchema),
    CategoryController.updateCategoryToDB
  );

export const CategoryRoutes = router;
