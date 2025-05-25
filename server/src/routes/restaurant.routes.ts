import { create } from 'domain';
import {createRestaurant, getResturantMenu  , getRestaurantOrder , updateOrderStatus , searchRestaurant , updateRestaurant } from '../controllers/restaurant.controller'
import { verifyJwt } from '../middlewares/auth.middleware';
import Router from 'express'
import { upload } from '../middlewares/multer.middleware';
const router = Router();

router.route('/create').post(verifyJwt ,upload.single("image") , createRestaurant);
router.route('/menu').get(verifyJwt , getResturantMenu);
// router.route('/menu/:restaurant_id').post(verifyJwt , updateMenu);
router.route('/order/:_id').post(verifyJwt , getRestaurantOrder);
router.route('/order/update').put(verifyJwt , updateOrderStatus);
router.route('/update').put(verifyJwt , upload.single("image") ,  updateRestaurant)

export default router