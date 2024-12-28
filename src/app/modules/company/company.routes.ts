import { Router } from 'express';
import auth from '../../middlewares/auth';
import { CompanyController } from './company.controllers';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';
const UPLOADS_FOLDER = 'uploads/company';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = Router();

router
  .route('/update-images')
  .post(
    auth('businessman'),
    upload.array('companyImages', 10),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    CompanyController.updateCompanyImages
  );

router
  .route('/delete-image')
  .delete(auth('businessman'), CompanyController.singeCompanyImageDelete);

//get my company
router.get(
  '/my-company',
  auth('businessman'),
  CompanyController.getMyCompanies
);

router
  .route('/')
  .post(
    auth('businessman'),
    upload.array('companyImages', 10),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    CompanyController.addedCompany
  )
  .get(CompanyController.getAllCompanies);

router
  .route('/:id')
  .get(CompanyController.getSingleCompany)
  .patch(
    auth('businessman'),
    upload.array('companyImages', 6),
    convertHeicToPngMiddleware(UPLOADS_FOLDER),
    CompanyController.updateCompany
  )
  .delete(auth('businessman'), CompanyController.deleteCompany);

export const CompanyRoutes = router;
