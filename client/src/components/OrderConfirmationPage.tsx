import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { X } from 'lucide-react';
import { Label } from '@radix-ui/react-menubar';
import { Input } from './ui/input';
import { useState } from 'react';
import { DialogFooter } from './ui/dialog';
export type input = {
	fullname: string,
	email: string,
	contact: string,
	city: string
	address: string
}
const OrderConfirmationPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
	const [input, setInput] = useState<input>({
		fullname: "",
		email: "",
		contact: "",
		city: "",
		address: ""
	})
	const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInput({ ...input, [name]: value })
	}
	const submitHandler = (e : FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		// api implementation 
		window.alert(input)
	}
	return (
		<div className='max-w-3xl mx-auto bg-gray-100 p-2 rounded-md '>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>

					<div className='flex flex-col gap-2 p-2'>
						<DialogTitle><h1 className='font-bold text-xl text-black'>Review Your Order</h1></DialogTitle>
						<DialogDescription>
							<p className='text-sm text-gray-600 '>Double-check your delivery details and ensure everything is in order. When you are ready,
								hit confirm button to finalize your order</p>
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

		</div>
	)
};
export default OrderConfirmationPage