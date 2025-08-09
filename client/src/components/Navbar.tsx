import { Link } from "react-router-dom"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent } from "./ui/menubar"
import { useState } from "react"
import { MenubarItem, Separator } from "@radix-ui/react-menubar"
import {  ShoppingCart, Loader2, Menu, User, HandPlatter, ForkKnifeCrossed, SquareMenu, PackageCheck, HomeIcon, LucideHandshake, FlashlightIcon, BikeIcon } from "lucide-react"
import { Button } from "./ui/button"
import userImage from "../assets/user.png"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"

import { useCartStore } from "../store/useCartStore"
import { useUserStore } from "../store/useUserStore"
const Navbar = () => {
    const cart = useCartStore((state) => state.cart)

    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const user = useUserStore((state) => state.user)
    const loading = useUserStore((state) => state.loading)
    // const loading = true;
    const logout = useUserStore((state) => state.logout)
    return (
        <div className='max-w-7xl mx-auto p-3'>
            <div className="flex items-center justify-between h-14 px-4">
                <Link to={"/"} className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-transparent">FlavorTrail.</Link>


                <div className="flex flex-row gap-6 items-center justify-around  p-3">
                    <div className="hidden md:flex items-center gap-4 text-gray-900 text-lg font-semibold">
                        {
                            isAuthenticated && <Link to={"/"}>Home</Link>
                        }
                        {
                            isAuthenticated && <Link to={"/profile"}>Profile</Link>
                        }
                        {
                            isAuthenticated && <Link to={"/order/success"}>Order</Link>
                        }
                        {
                            isAuthenticated && <Link to={"/order/delivered"}>Delivered</Link>
                        }
                        {
                            !isAuthenticated && <Link to={"/signup"}>
                                <button className="bg-gradient-to-br from-orange-300 to-orange-600  rounded-md text-sm text-white  font-semibold p-2 w-23">Signup</button>
                            </Link>
                        }
                        {
                            !isAuthenticated && <Link to={"/login"}>
                                <button className="bg-gradient-to-br from-orange-300 to-orange-600  rounded-md text-sm text-white  font-semibold p-2 w-23" >Login</button>
                            </Link>
                        }
                   
                         {   
                            (user==null && !isAuthenticated) || (isAuthenticated && !user?.isAdmin) ?
                            <Link to={"/join"} >
                                <button className="bg-gradient-to-br from-orange-300 to-orange-600 text-white font-semibold text-sm p-2  flex justify-center items-center gap-2 rounded-md">
                                    <LucideHandshake size={16}/>Join With Us</button>
                            </Link> : <></>
                        }
                        
                        {
                            user && user.isAdmin && isAuthenticated &&
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>Dashboard</MenubarTrigger>
                                    <MenubarContent className="text-gray-900 " >
                                        <Link to={"/admin/restaurant"}>
                                            <MenubarItem className="hover:bg-gray-50 p-1">Resturant</MenubarItem>
                                        </Link>
                                        <Link to={"/admin/addMenu"}>
                                            <MenubarItem className="hover:bg-gray-50 p-1">Menu</MenubarItem>
                                        </Link>
                                        <Link to={"/admin/order"}>
                                            <MenubarItem className="hover:bg-gray-50 p-1">Order</MenubarItem>
                                        </Link>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>

                        }
                    </div>
                    <div className=" hidden md:flex md:flex-row gap-7 items-center justify-end">

                        {
                            user && isAuthenticated && <div className="relative">
                                <Link to="/cart">
                                    <ShoppingCart className="  cursor-pointer font-semibold" />
                                    {cart?.length > 0 && <Button size={'icon'} className="absolute -top-3 left-4 text-xs bg-red-500 h-4 w-4 rounded-full text-white" >{cart?.length}</Button>}
                                </Link>
                            </div>
                        }

                        {
                            user && isAuthenticated && <Link to={"/profile"}>
                                <div className="w-[30px]">
                                <img src={user.avatarImage || userImage}  className="w-[30px] h-[30px] rounded-full"/>
                            </div>
                            </Link>
                        }

                        {
                            user && isAuthenticated &&
                            <div>
                                {
                                    !loading ?
                                        <button className="bg-orange-500 hover:bg-orange-400 rounded-md w-17 text-white  font-semibold px-2 py-1" onClick={()=>logout()}>Logout</button> :
                                        <button className="bg-orange-500 text-white font-semibold w-17 text-sm flex  flex-row justify-center  gap-2 items-center px-2 py-1 rounded-md">
                                            <Loader2 className="text-white text-xs animate-spin"/></button>
                                }
                            </div>
                        }
                    </div>
                    <div className="md:hidden">
                        <MobileNavbar />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Navbar

const MobileNavbar = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const user = useUserStore((state) => state.user)
    const loading = useUserStore((state) => state.loading)
    const cart = useCartStore((state)=>state.cart)
    const logout = useUserStore((state)=>state.logout)
    const [open , setOpen] = useState<boolean>(false)
    const handleLogout = async()=>{
       try{
        const response =  await logout()
        response && setOpen(false)
       }catch(e){
        console.log("errro from mobile navbar component" , e)
       }
    }
    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Button size={'icon'} onClick={()=>setOpen(true)} className="rounded-full bg-gray-200 text-black hover:bg-gray-300">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="flex flex-row justify-between mt-6">
                        <SheetTitle className="text-2xl text-center  font-extrabold bg-gradient-to-r from-orange-600 to-yellow-400 bg-clip-text text-transparent">Flavortrail</SheetTitle>

                    </SheetHeader>
                    <Separator className="my-2"></Separator>
                    <SheetDescription className="flex flex-col  p-4 gap-3 ">
                         { !isAuthenticated &&
                            <Link to={"/signup"}  onClick={() => setOpen(false)} className="flex flex-row gap-4  items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <User />
                                <span>Signup</span>
                            </Link>
                        }
                         { !isAuthenticated &&
                            <Link to={"/login"}  onClick={() => setOpen(false)} className="flex flex-row gap-4  items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <User />
                                <span>Signin</span>
                            </Link>
                        }
                        {   
                            (user==null && !isAuthenticated) || (isAuthenticated && !user?.isAdmin) ?
                            <Link to={"/join"}  onClick={() => setOpen(false)}>
                                <button className="bg-gradient-to-br from-orange-300 to-orange-600 text-white font-semibold text-sm p-2  flex justify-center items-center gap-2 rounded-md">
                                    <LucideHandshake size={16}/>Join With Us</button>
                            </Link> : <></>
                        }
                        {user && isAuthenticated &&
                            <Link to={"/profile"}  onClick={() => setOpen(false)} className="flex flex-row gap-4  items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <User />
                                <span>Profile</span>
                            </Link>
                        }
                        {
                            user && isAuthenticated &&
                            <Link to={"/order/success"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <HandPlatter />
                                <span>Order</span>
                            </Link>
                        }
                        {
                            user && isAuthenticated &&
                            <Link to={"/order/delivered"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <BikeIcon/>
                                <span>Delivered</span>
                            </Link>
                        }
                         {
                            user && isAuthenticated &&
                            <Link to={"/"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <HomeIcon />
                                <span>Home</span>
                            </Link>
                        }
                        {
                            user && isAuthenticated &&

                            <Link to={"/cart"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <ShoppingCart />
                                <span>Cart {cart?.length >=1 && cart.length}</span>
                            </Link>
                        }
                        {
                            user && isAuthenticated && user.isAdmin &&
                            <Link to={"/admin/addMenu"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <SquareMenu />
                                <span>Menu</span>
                            </Link>
                        }
                        {
                            user && isAuthenticated && user.isAdmin &&
                            <Link to={"/admin/restaurant"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <ForkKnifeCrossed />
                                <span>Restaurant</span>
                            </Link>
                        }

                        {
                            user && isAuthenticated && user.isAdmin &&
                            <Link to={"/admin/order"}  onClick={() => setOpen(false)} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                                <PackageCheck />
                                <span>Restaurant Orders</span>
                            </Link>
                        }
                    </SheetDescription>
                    {
                        user && isAuthenticated && 
                        <SheetFooter>
                        {
                            !loading ? <button className="bg-orange-500 rounded-md text-white p-2 font-semibold w-full" onClick={()=>handleLogout()}>Logout</button> :
                                <button disabled className="bg-orange-400 rounded-md text-white flex flex-row justify-center gap-2 p-2 font-semibold w-full"><Loader2 className='animate-spin' />Please Wait</button>
                        }
                    </SheetFooter>
                    }
                </SheetContent>
            </Sheet>

        </div>
    )
}
