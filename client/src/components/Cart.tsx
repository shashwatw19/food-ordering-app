import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from '../components/ui/table'; // Replace 'your-library' with the actual library name
import { Button } from './ui/button';
import { useState } from 'react';
import OrderConfirmationPage from './OrderConfirmationPage';
const Cart = () => {
    const [open , setOpen] = useState<boolean>(false);
    return <div className="flex flex-col max-w-7xl my-10 mx-auto">
        <div className="flex flex-end">
            <button className="bg-black px-3 py-1 text-white rounded-md font-medium ">Clear</button>
        </div>
        <Table>
            
            <TableHeader>
                <TableRow>
                    <TableHead className="">Items</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className='text-right'></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Avatar>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </TableCell>
                    <TableCell>Biryani</TableCell>
                    <TableCell>80</TableCell>
                    <TableCell>
                        <div className='w-fit flex flex-row items-center gap-2 rounded-full border border-gray-100 dark:border-gray-800 shadow-md'>
                            <Button size={'icon'} variant={'outline'} className='rounded-full bg-gray-200 '>-</Button>
                            <Button size={'icon'} variant={'outline'} className='font-bold border-none bg-white hover:bg-white'>2</Button>
                            <Button size={'icon'} variant={'outline'} className='rounded-full bg-orange-500 hover:bg-orange-400 '>+</Button>
                        </div>
                    </TableCell>
                    <TableCell>80</TableCell>
                    <TableCell className='flex items-center flex-row justify-end'>
                        <Button size={'sm' } className='bg-gray-100 px-3 py-1 text-right hover:bg-gray-50 text-black'>Remove</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className='text-right'>80</TableCell>
            </TableFooter>
        </Table>
        <div className='flex justify-end my-5'> 
            <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold">Proceed to checkout</Button>
        </div>
        <OrderConfirmationPage setOpen={setOpen}/>
    </div>
}
export default Cart