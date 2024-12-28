import { Router } from 'express';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';
import { ServiceController } from './service.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
const UPLOADS_FOLDER = 'uploads/services';
const upload = fileUploadHandler(UPLOADS_FOLDER);
const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    upload.single('serviceImage'),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    validateRequest(ServiceValidation.addServiceValidationSchema),
    ServiceController.addService
  )
  .get(ServiceController.getServices);

router
  .route('/:id')
  .get(ServiceController.getSingleService)
  .patch(
    auth('admin'),
    upload.single('serviceImage'),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    validateRequest(ServiceValidation.updateServiceValidationSchema),
    ServiceController.updateService
  )
  .delete(auth('admin'), ServiceController.deleteService);

export const ServiceRoutes = router;
