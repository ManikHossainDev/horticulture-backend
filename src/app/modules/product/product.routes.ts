import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.validations';
import { ProductController } from './product.controllers';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';
const UPLOADS_FOLDER = 'uploads/products';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = Router();

router
  .route('/add-image')
  .post(
    auth('admin'),
    upload.array('productImages', 6),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    ProductController.uploadProductImages
  );

router
  .route('/delete-image')
  .delete(auth('admin'), ProductController.singeProductImageDelete);
router
  .route('/')
  .post(
    auth('admin'),
    upload.array('productImages', 6),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    validateRequest(ProductValidation.CreateProductValidationSchema),
    ProductController.createProductToDB
  )
  .get(ProductController.getAllProductsFromDB);
router
  .route('/:id')
  .get(ProductController.getSingleProductFromDB)
  .patch(
    auth('admin'),
    upload.array('productImages', 6),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    ProductController.updatedProductToDB
  )
  .delete(auth('admin'), ProductController.deleteProductToDB);

export const ProductRoutes = router;
