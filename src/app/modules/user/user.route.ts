import express from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import convertHeicToPngMiddleware from '../../middlewares/convertHeicToPngMiddleware';

const UPLOADS_FOLDER = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER);

const router = express.Router();
router.post(
  '/profile-image',
  auth('common'),
  upload.single('profileImage'),
  convertHeicToPngMiddleware(UPLOADS_FOLDER),
  UserController.updateUserImage
);
// sub routes must be added after the main routes
router.get('/profile', auth('common'), UserController.getMyProfile);

router.patch(
  '/profile',
  auth('common'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateMyProfile
);

//main routes
router
  .route('/')
  .get(auth('admin'), UserController.getAllUsers)
  .delete(auth('common'), UserController.deleteMyProfile);

router
  .route('/:id')
  .get(auth('common'), UserController.getSingleUserFromDB)
  .patch(
    auth('admin'),
    validateRequest(UserValidation.changeUserStatusValidationSchema),
    UserController.changeUserStatus
  );

export const UserRoutes = router;
