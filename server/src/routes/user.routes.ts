import { Router } from 'express'
import { signin, signup , forgotPassword , resetPassword , updateProfile } from '../controllers/user.controller'
import { createOtp } from '../controllers/otp.controller';
import { verifyJwt } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';
const router = Router();


// otp creation
router.route('/createOtp').post(createOtp);

// user routes
router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword);
router.route('/updateProfile').put(verifyJwt, upload.single("image"), updateProfile);


export default router