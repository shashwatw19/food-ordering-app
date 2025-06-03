import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import { toast } from 'sonner';
import { Label } from '@radix-ui/react-menubar';
import { Input } from './ui/input';
import { useState } from 'react';
import { DialogFooter } from './ui/dialog';
import { useUserStore } from '../store/useUserStore';
import { CheckoutSessionRequest, VerifyPayment } from '../types/orderType';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore } from '../store/useOrderStore';
import thali from "../assets/thali.jpg"
import { useNavigate } from 'react-router-dom';

declare const window: any;
export type input = {
	fullname: string,
	email: string,
	contact: string,
	city: string
	address: string
}
type OrderConfirmationProps = {
	open : boolean,
	setOpen :  Dispatch<SetStateAction<boolean>> 
}
const OrderConfirmationPage = ({ open, setOpen }: OrderConfirmationProps) => {
	const [input, setInput] = useState<input>({
		fullname: "",
		email: "",
		contact: "",
		city: "",
		address: ""
	})

	const cart = useCartStore((state) => state.cart)
	const restaurantId = useCartStore((state) => state.restaurantId)
	const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput({ ...input, [name]: value })
	}
	const user = useUserStore((state) => state.user)
	const navigate = useNavigate()
	const capturePayment = useOrderStore((state) => state.capturePayment)
	const loadScript = useOrderStore((state) => state.loadScript)
	const verifyPayment = useOrderStore((state) => state.verifyPayment)
	const sendPaymentSuccessEmail = useOrderStore((state) => state.sendSuccessMail)
	const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// api implementation 
		const checkoutSessionData: CheckoutSessionRequest = {
			cartItems: cart,
			DeliveryDetails: input,
			restaurantId: restaurantId!,

		}
		// razorpay payment integration starts here....
		try {

			const rzpScript = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
			if (!rzpScript) {
				toast.error("Razorpay SDK failed to load. Check your Internet Connection.")
				return;
			}
			// creating order
			const orderResponse = await capturePayment(checkoutSessionData)
			console.log("orderResponse from rzp" , orderResponse)
			const options = {
				key: import.meta.env.VITE_RAZORPAY_ID,
				currency: orderResponse?.data?.data?.currency,
				amount: `${orderResponse?.data?.data?.amount}`,
				order_id: orderResponse?.data?.data?.id,
				name: "FlavorTrails",
				description: "Thank you for Purchasing the Course.",
				image: thali,
				prefill: {
					name: user?.fullname,
					email: user?.email,
				},
				handler: function (response: any) {
					const verifyPaymentData : VerifyPayment = {
						razorpay_order_id : response.razorpay_order_id,
						razorpay_payment_id : response.razorpay_payment_id,
						razorpay_signature : response.razorpay_signature,
						totalAmount :  `${orderResponse?.data?.data?.amount}`,
						orderDetails : {
							cartItems : cart,
							DeliveryDetails : input ,
							restaurantId : restaurantId!
						},
						
						
					}
					verifyPayment(verifyPaymentData , navigate)
					sendPaymentSuccessEmail(verifyPaymentData.orderDetails)
				},
				theme: {
    				color: "#fb923c" 
  				}
			}
			console.log("options created for window object" , options)
			const paymentObject = new window.Razorpay(options) 

			paymentObject.open()
			
			paymentObject.on("payment.failed", function (response: any) {
				toast.error("Payment Failed.")
				console.log(response.error)
			})
			
		} catch (e) {
			console.log("error from orderConfirmation Component", e)
		}finally{
			setOpen(false)
		}
	}
	useEffect(() => {
		setInput({
			fullname: user?.fullname || "",
			email: user?.email || "",
			contact: user?.contact.toString() || "",
			city: user?.city || "",
			address: user?.address || ""
		})
	}, [])
	return (
		
			<Dialog open={open} onOpenChange={setOpen} >
				<DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className='bg-gray-50 p-2 flex flex-col'>

					<div className='flex flex-col gap-2 p-2'>
						<DialogTitle><p className='font-bold text-xl text-black'>Review Your Order</p></DialogTitle>
						<DialogDescription>
							<span className='text-sm text-gray-600 '>Double-check your delivery details and ensure everything is in order. When you are ready,
								hit confirm button to finalize your order</span>
						</DialogDescription>
					</div>
					<form onSubmit={submitHandler} className='md:grid md:grid-cols-2 gap-2 space-y-1 md:space-y-0 '>
						<div className='p-2 flex flex-col gap-2 '>
							<Label className='text-gray-700 font-medium'>Fullname</Label>
							<Input type="text" name='fullname' value={input.fullname} onChange={changeEventHandler} />
						</div>
						<div className='p-2 flex flex-col gap-2 '>
							<Label className='text-gray-700 font-medium'>Email</Label>
							<Input type="email" name='email' value={input.email} onChange={changeEventHandler} />
						</div>
						<div className='p-2 flex flex-col gap-2 '>
							<Label className='text-gray-700 font-medium'>address</Label>
							<Input type="text" name='address' value={input.address} onChange={changeEventHandler} />
						</div>
						<div className='p-2 flex flex-col gap-2 '>
							<Label className='text-gray-700 font-medium'>contact</Label>
							<Input type="text" name='contact' value={input.contact} onChange={changeEventHandler} />
						</div>
						<div className='p-2 flex flex-col gap-2 '>
							<Label className='text-gray-700 font-medium'>city</Label>
							<Input type="text" name='city' value={input.city} onChange={changeEventHandler} />
						</div>

						<div className='p-2 flex items-end md:justify-end justify-center'>
							<DialogFooter>
								<button type='submit' className='bg-gray-900  text-white p-3 font-semibold mt-2 rounded-md '>Continue To Payment</button>
							</DialogFooter>
						</div>
					</form>

				</DialogContent>

			</Dialog>

		
	)
};
export default OrderConfirmationPage