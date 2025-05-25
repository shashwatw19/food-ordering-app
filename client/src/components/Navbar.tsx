import { Link } from "react-router-dom"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent } from "./ui/menubar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { MenubarItem, Separator } from "@radix-ui/react-menubar"
import { Sun, Moon, ShoppingCart, Loader2, Menu, User, HandPlatter, ForkKnifeCrossed, SquareMenu, PackageCheck } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { useState } from "react"
const Navbar = () => {
    const admin = true;
    const cartItem = 2;
    const [loading, setLoading] = useState<boolean>(true)
    return (
        <div className='max-w-7xl mx-auto p-3'>
            <div className="flex items-center justify-between h-14 px-4">
                <Link to={"/"} className="font-bold md:font-extrabold text-2xl">AppName</Link>

                <div className="flex flex-row gap-2 items-center justify-around  p-3">
                    <div className="hidden md:flex items-center gap-4">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/profile"}>Profile</Link>
                        <Link to={"/order/status"}>Order</Link>
                        <Link to={"/signup"}>Sign up</Link>
                        <Link to={"/login"}>Login</Link>
                        {
                            admin &&
                            <Menubar>
                                <MenubarMenu>
                                    <MenubarTrigger>Dashboard</MenubarTrigger>
                                    <MenubarContent >
                                        <Link to={"/admin/resturant"}>
                                            <MenubarItem>Resturant</MenubarItem>
                                        </Link>
                                        <Link to={"/admin/menu"}>
                                            <MenubarItem>Menu</MenubarItem>
                                        </Link>
                                        <Link to={"/admin/orders"}>
                                            <MenubarItem>Order</MenubarItem>
                                        </Link>
                                    </MenubarContent>
                                </MenubarMenu>
                            </Menubar>

                        }
                    </div>
                    <div className=" hidden md:flex md:flex-row gap-4 items-center justify-end">
                        {/* drop dowm menu for theme selection */}

                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem >
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem >
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="relative">
                            <Link to="/cart">
                                <ShoppingCart className="  cursor-pointer font-semibold" />
                                <Button size={'icon'} className="absolute -top-3 left-4 text-xs bg-red-500 h-4 w-4 rounded-full text-white" >{cartItem}</Button>
                            </Link>
                        </div>

                        <Avatar>
                            <AvatarImage></AvatarImage>
                            <AvatarFallback>pht</AvatarFallback>
                        </Avatar>

                        <div>
                            {/* {
                                loading ? <button className="bg-orange-500 hover:bg-orange-400 rounded-md  text-white  font-semibold p-2 ">Logout</button> :
                                    <button className="bg-orange-400 test-white font-semibold text-white  text-sm flex  flex-row justify-center gap-2 items-center p-2 rounded-md"><Loader2 className="text-white text-xs animate-spin" />Logging out</button>
                            } */}
                            <button className=" text-gray-700 bg-gray-50 rounded-md font-medium px-2 py-1 ">logout</button>

                        </div>
                        {/* <button onClick={() => setLoading(!loading)}>logout</button> */}


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
    const mobLoading = 1
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-300">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader className="flex flex-row justify-between mt-6">
                        <SheetTitle className="text-black text-xl">AppName</SheetTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem >
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SheetHeader>
                    <Separator className="my-2"></Separator>
                    <SheetDescription className="flex flex-col  p-4 gap-3 ">
                        <Link to={"/profile"} className="flex flex-row gap-4  items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <User />
                            <span>Profile</span>
                        </Link>
                        <Link to={"/"} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <HandPlatter />
                            <span>Order</span>
                        </Link>
                        <Link to={"/profile"} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <ShoppingCart />
                            <span>Cart (0)</span>
                        </Link>
                        <Link to={"/profile"} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <SquareMenu />
                            <span>Menu</span>
                        </Link>
                        <Link to={"/profile"} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <ForkKnifeCrossed />
                            <span>Restaurant</span>
                        </Link>
                        <Link to={"/profile"} className="flex flex-row gap-4 items-center rounded-md p-2 hover:bg-gray-200 text-gray-800 text-md">
                            <PackageCheck />
                            <span>Restaurant Orders</span>
                        </Link>
                    </SheetDescription>
                    <SheetFooter>
                        {
                            mobLoading ? <button className="bg-orange-500 rounded-md text-white p-2 font-semibold w-full">Logout</button> :
                                <button disabled className="bg-orange-400 rounded-md text-white flex flex-row justify-center gap-2 p-2 font-semibold w-full"><Loader2 className='animate-spin' />Please Wait</button>
                        }
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </div>
    )
}
