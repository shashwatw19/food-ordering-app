import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { ChangeEvent, FormEvent, useState } from "react"
import { Plus } from "lucide-react"
import { DialogFooter, DialogHeader } from "../ui/dialog"
import { Label } from "@radix-ui/react-menubar"
import { Input } from "../ui/input"
import { MenuFormSchema, menuFromSchema } from "../../schema/menuFormSchema"
import pizza3 from "../../assets/pizzza3.jpg"
import pizza2 from "../../assets/pizza2.jpg"
import pizza from "../../assets/pizza.avif"
import { Button } from "../ui/button"
import EditMenu from "./EditMenu"
const AddMenu = () => {
    const [selected , setSelected ] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [menu, setMenu] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        images: null
    })
    console.log("selecteddd" , selected)
    const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setMenu({ ...menu, [name]: type == "number" ? Number(value) : value })
    }
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const result = menuFromSchema.safeParse(menu)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<MenuFormSchema>)
        }
        // api implementation from here


    }
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
                <DialogContent className="bg-gray-50 rounded-md p-1 mx-auto className='md:grid md:grid-cols-2 gap-2 space-y-1 md:space-y-0 mt-3">
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
                                    <Input type="text" name='item' value={menu.name} onChange={changeEventHandler} />
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
                                    <Label className='text-gray-700 font-medium'>contact</Label>
                                    <Input type="file" name='image/*' onChange={(e) => setMenu({ ...menu, images: e.target.files ? e.target.files?.[0] : null })} />
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
            <div className="mt-6 space-y-4 ">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 shadow-md rounded-lg border-1 border-gray-300">
                    <img src={pizza3} className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg " />
                    <div className="flex-1 p-2">
                        <h1 className="text-lg font-semibold text-gray-800">Biryani</h1>
                        <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, molestias
                            dolor sit amet consectetur adipisicing elit. Eum, molestias.</p>
                        <p className=" font-medium text-gray-800">Price : <span className="text-orange-500 ">₹80</span></p>
                        <Button size={'sm'} onClick={()=>setSelected(!selected)} className="bg-orange-500 hover:bg-orange-400 text-white md:w-[12%] w-full font-semibold rounded-md mt-2 ">Edit</Button>
                    </div>
                </div>



                {/* edit pop-up */}
                <div>
                     <EditMenu selected={selected} setSelected={setSelected}/>
                </div>
            </div>
        </div>
    )
}

export default AddMenu

