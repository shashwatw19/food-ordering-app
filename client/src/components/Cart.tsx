import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../components/ui/table'; 
import { Button } from './ui/button';
import pizza2 from '../../src/assets/pizza2.jpg'
import OrderConfirmationPage from './OrderConfirmationPage';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'sonner';
import { CartItem } from '../types/cartType';
import { useState } from 'react';
const Cart = () => {
    
    const [open, setOpen] = useState<boolean>(false);
    const cart = useCartStore((state) => state.cart)
    console.log("cart item " , cart )
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const incrementItem = useCartStore((state) => state.incrementItem)
    const decrementItem = useCartStore((state) => state.decrementItem)
    const resetCart = useCartStore((state) => state.resetCart)
    
    const handleDecrementItem = (item: CartItem , )=>{
        if( item.quantity > 1){
            decrementItem(item._id)
        }
        else{
            removeFromCart(item._id)
        }
    }
    const totalAmount = cart.reduce((acc, ele) => {
        return acc + (ele.price as number * ele.quantity);
    }, 0);
    const handleCheckoutOpen = () => {
        if (cart.length == 0) {
            toast.error("Your Cart is Empty !! Add Items in Carts to Checkout")
            return;
        }
        setOpen(true)
        console.log("open state" , open)
        
    }
    return <div className="flex flex-col max-w-7xl min-h-screen my-10 p-4 mx-auto">
        <div className="flex flex-row justify-end ">
            <button className="bg-gray-300 px-3 py-1 text-gray-800 rounded-md font-medium " onClick={() => resetCart()}>Clear</button>
        </div>
        <Table>

            <TableHeader>
                <TableRow>
                    <TableHead className="">Items</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    cart && cart.map((item) => {
                        return <TableRow key={item._id}>
                            <TableCell>
                                <div>
                                    <img src={item?.imageUrl ||pizza2 } alt='image' className='object-cover rounded-full w-[40px] h-[40px]' />
                                </div>
                            </TableCell>
                            <TableCell className='text-gray-800 font-semibold '>{item.name}</TableCell>
                            <TableCell className='text-gray-800 font-semibold '>₹{item.price.toString()}</TableCell>
                            <TableCell>
                                <div className='w-fit flex flex-row items-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-md'>
                                    <Button size={'icon'} variant={'outline'} className='rounded-full bg-gray-200 ' onClick={() => handleDecrementItem(item)}>-</Button>
                                    <Button size={'icon'} variant={'outline'} className='font-bold border-none bg-white hover:bg-white'>{item.quantity}</Button>
                                    <Button size={'icon'} variant={'outline'} className='rounded-full bg-orange-500 hover:bg-orange-400 ' onClick={() => incrementItem(item._id)}>+</Button>
                                </div>
                            </TableCell>
                            <TableCell className='text-gray-800 font-semibold'>₹{item.price as number * item.quantity}</TableCell>
                            <TableCell className='flex items-center flex-row justify-end'>
                                <Button size={'sm'} className='bg-gray-100 px-3 py-1 text-right hover:bg-gray-50 text-black' onClick={() => removeFromCart(item._id)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody> 
            <TableFooter>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className='text-right text-gray-800 font-bold'>₹{totalAmount}</TableCell>
            </TableFooter>
        </Table>
        <div className='flex justify-end my-5'>
            <button onClick={() => handleCheckoutOpen()} className="bg-orange-500 hover:bg-orange-400 px-3 py-2 rounded-md text-white font-semibold">Proceed to checkout</button>
        </div>
 
            {/* payment confirmation dialog box */}
            <OrderConfirmationPage open={open} setOpen={setOpen} />
            
        

    </div>
}
export default Cart