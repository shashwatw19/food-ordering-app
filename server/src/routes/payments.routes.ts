import Router from 'express'
import { verifyJwt } from '../middlewares/auth.middleware'
import { capturePayment , sendOrderSuccessMail , verifyPayment } from '../controllers/payments.controller'
const router = Router()

router.post('/capturePayment' , verifyJwt , capturePayment)
router.post('/successOrderMail' , verifyJwt , sendOrderSuccessMail)
router.post('/verify' ,verifyJwt , verifyPayment)
export default router