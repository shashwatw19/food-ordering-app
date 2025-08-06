
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { DialogFooter, DialogHeader, DialogDescription, Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "@radix-ui/react-menubar"
import { Input } from "../ui/input"
import { MenuFormSchema, menuFromSchema } from "../../schema/menuFormSchema"
import { Button } from "../ui/button"
import EditMenu from "./EditMenu"
import { useRestaurantStore } from "../../store/useRestaurantStore"
import { useMenuStore } from "../../store/useMenuStore"
import { MenuItem } from "../../types/restaurantType"
const AddMenu = () => {
    const [selectedMenu , setSelectedMenu ] = useState<MenuItem>({
        _id : "",
        name : "",
        description : "",
        imageUrl : "",
        price : 0
    })
  
    const [editOpen , setEditOpen] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [menu, setMenu] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        images: undefined
    })
    const [updateMenu , setUpdateMenu] = useState<boolean>(false)
    const addMenu = useMenuStore((state)=>state.addMenu)
    const getRestaurantMenu = useRestaurantStore((state)=>state.getRestaurantMenu)
    const restaurant = useRestaurantStore((state)=>state.restaurant)
    // console.log("restaurant from addMEnu " , restaurant)
    const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setMenu({ ...menu, [name]: type == "number" ? Number(value) : value })
    }
    const handleEditMenu = ( menu : MenuItem)=>{
        console.log("menu item selected " , menu)
        setSelectedMenu({
            name : menu.name,
            description : menu.description,
            _id : menu._id,
            imageUrl : menu.imageUrl,
            price : menu.price
        })
        setEditOpen(true)
    }
    const submitHandler = async(e: FormEvent) => {
        e.preventDefault()
        const result = menuFromSchema.safeParse(menu)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<MenuFormSchema>)
        }
        // api implementation from here
   
       try{
            const formdata = new FormData()
            formdata.append("name" , menu.name)
            formdata.append("description" , menu.description)
            formdata.append("price" , menu.price.toString())
            
            if(menu?.images){
                formdata.append("image" , menu.images)
            }
            
            await addMenu(formdata)

       }catch(e){   
        console.log('error in addMenu component' , e)
       }finally{
        setMenu({
             name: "",
            description: "",
            price: 0,
            images: undefined
        })
        setOpen(false)
       }


    }
    
    useEffect(()=>{
        const findMenu = async()=>{
            getRestaurantMenu()
            setUpdateMenu(false)    
        }
        findMenu()    
    },[updateMenu])
    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-3  my-10 p-4 ">
            <div className="flex justify-between ">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menu</h1>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <div className=" rounded-md flex md:justify-end justify-start  items-center">
                    <DialogTrigger>
                        <button onClick={() => setOpen(!open)} className="bg-orange-500 text-white p-2 hover:bg-orange-400 font-semibold flex flex-row justify-items-center gap-1  rounded-md"><Plus />Add Menu</button>
                    </DialogTrigger>
                </div>
                <DialogContent className="bg-gray-50 rounded-md p-1 mx-auto">
                    <DialogHeader>
                        <div className="p-2">
                            <DialogTitle className="text-xl font-medium   text-center">Add A New Menu</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500 text-center">
                                Create a menu that will make your restaurant stant out..
                            </DialogDescription>
                        </div>
                        <form onSubmit={submitHandler} >
                            <div className='md:grid md:grid-cols-2 space-y-1 md:space-y-0 '>
                                <div className='p-2 flex flex-col items-start gap-1 '>
                                    <Label className='text-gray-700 font-medium'>Item</Label>
                                    <Input type="text" name='name' value={menu.name} onChange={changeEventHandler} />
                                    {
                                        errors && <span className="text-red-500 text-sm">{errors.name}</span>
                                    }
                                </div>
                                <div className='p-2 flex flex-col  items-start gap-1  '>
                                    <Label className='text-gray-700 font-medium'>Description</Label>
                                    <Input type="text" name='description' value={menu.description} onChange={changeEventHandler} />
                                    {
                                        errors && <span className="text-red-500 text-sm">{errors.description}</span>
                                    }
                                </div>
                                <div className='p-2 flex flex-col  items-start gap-1  '>
                                    <Label className='text-gray-700 font-medium'>Price</Label>
                                    <Input type="number" name='price' value={menu.price} onChange={changeEventHandler} />
                                    {
                                        errors && <span className="text-red-500 text-sm">{errors.price}</span>
                                    }
                                </div>
                                <div className='p-2 flex flex-col items-start gap-1  '>
                                    <Label className='text-gray-700 font-medium'>Image</Label>
                                    <Input type="file" accept="image/*" name='image' onChange={(e) => setMenu({ ...menu, images: e.target.files ? e.target.files?.[0] : undefined })} />
                                    {
                                        errors?.images && <span className="text-red-500 text-sm">{errors.images?.name || "image file is required"}</span>
                                    }
                                </div>
                            </div>
                            <div className='p-2 flex items-center w-full justify-center'>
                                <DialogFooter>
                                    <button type='submit' className='bg-orange-500  text-white px-3 py-2 font-semibold mt-2 rounded-md '>Create</button>
                                </DialogFooter>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
            {/* menu items starts here */}
            {
                restaurant?.menu?.length == 0 ? 
                <p className="text-xl text-gray-600 font-medium mt-5">Your Restaurant Does't Have Any Menu. <span className="text-sm "></span></p> :
                <div className="mt-6 space-y-4">
                    {
                        restaurant?.menu?.map((item)=>{
                            return <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border-1 border-gray-300">
                                        <img src={item?.imageUrl} alt="Image" className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg " />
                                        <div className="flex-1 p-2">
                                            <h1 className="text-lg font-semibold text-gray-800">{item?.name}</h1>
                                            <p className="text-gray-600 text-sm">{item?.description}</p>
                                            <p className=" font-medium text-gray-800">Price : <span className="text-orange-500 ">{item?.price.toString()}</span></p>
                                            <Button size={'sm'} 
                                            onClick={()=>{
                                                            setEditOpen(true); 
                                                            setSelectedMenu({_id : item._id , name : item.name , description : item.description , imageUrl : item.imageUrl , price : item.price})}} 
                                                            className="bg-orange-500 hover:bg-orange-400 text-white md:w-[12%] w-full font-semibold rounded-md mt-2 ">Edit
                                            </Button>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            }
            <div className="mt-6 space-y-4 ">
                



                {/* edit pop-up */}
                <div>
                  {editOpen && <EditMenu setUpdateMenu={setUpdateMenu} selectedMenu={selectedMenu}  setSelectedMenu={setSelectedMenu} editOpen={editOpen} setEditOpen = {setEditOpen}/>}   
                </div>
            </div>
        </div>
    )
}

export default AddMenu

