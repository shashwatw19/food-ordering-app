import { create } from 'domain';
import {createRestaurant, getResturantMenu  , getRestaurantOrder , updateOrderStatus , searchRestaurantWithFilters ,getRestaurant,  updateRestaurant ,getSingleRestaurant} from '../controllers/restaurant.controller'
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
router.route('/search/:location').get(searchRestaurantWithFilters)
router.route('/').get(verifyJwt , getRestaurant)
router.route('/:_id').get(getSingleRestaurant)

export default router