import Router from 'express'
import {findOrderStatus, updateStatus, getDeliveredOrdersForUser , findOrderForRestaurant , getAllOrdersForRestaurant ,getPendingOrders  }from '../controllers/order.controller'
import { verifyJwt } from '../middlewares/auth.middleware'
const router = Router()

router.route('/status').post(verifyJwt , findOrderStatus).put(verifyJwt , updateStatus)
router.route('/delivered').get(verifyJwt , getDeliveredOrdersForUser)
router.route('/findOrders').get(verifyJwt , findOrderForRestaurant)
router.route('/getOrder').get(verifyJwt , getAllOrdersForRestaurant)
router.route('/pending').get(verifyJwt , getPendingOrders)
export default router