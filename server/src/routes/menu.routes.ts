import Router from 'express'
import {addMenu , updateMenu} from '../controllers/menu.controller'
import { verifyJwt } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/multer.middleware';
const router = Router();
router.route('/addMenu').post(verifyJwt , upload.single("image") , addMenu);
router.route('/updateMenu').put(verifyJwt , upload.single("image") , updateMenu);
export default router