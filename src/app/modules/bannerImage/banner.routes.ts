import { Router } from 'express';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';
import auth from '../../middlewares/auth';
import { BannerImageController } from './banner.controllers';

const UPLOADS_FOLDER = 'uploads/banners';
const upload = fileUploadHandler(UPLOADS_FOLDER);
const convertHeicToPng = convertHeicToPngMiddleware(UPLOADS_FOLDER);

const router = Router();

router
  .route('/')
  .post(
    auth('admin'),
    upload.single('bannerImage'),
    convertHeicToPng,
    BannerImageController.addBannerImage
  )
  .get(BannerImageController.getBannerImages);

router
  .route('/:id')
  .get(BannerImageController.getSingleBannerImage)
  .patch(
    auth('admin'),
    upload.single('bannerImage'),
    convertHeicToPng,
    BannerImageController.updateBannerImage
  )
  .delete(auth('admin'), BannerImageController.deleteBannerImage);

export const BannerImageRoutes = router;
