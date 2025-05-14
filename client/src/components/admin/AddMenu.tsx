import { Dialog, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { ChangeEvent, FormEvent, useState } from "react"
import { Plus } from "lucide-react"
import { DialogFooter, DialogHeader } from "../ui/dialog"
import { Label } from "@radix-ui/react-menubar"
import { Input } from "../ui/input"
import { MenuFormSchema, menuFromSchema } from "../../schema/menuFormSchema"
const AddMenu = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [menu , setMenu ] = useState<MenuFormSchema>({
        name : "",
        description : "",
        price: 0,
        images : null
    })
    const [errors , setErrors] = useState<Partial<MenuFormSchema>>({})

    const changeEventHandler = (e : ChangeEvent<HTMLInputElement>)=>{
            const {name , value , type } = e.target
            setMenu({...menu , [name] : type == "number" ? Number(value) : value})
    }
    const submitHandler = (e : FormEvent)=>{
        e.preventDefault()
        const result = menuFromSchema.safeParse(menu)
        if(!result.success){
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<MenuFormSchema>)
        }
        // api implementation from here

        
    }
    return (
        <div className="max-w-6xl mx-auto my-10 ">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menu</h1>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <button className="bg-orange-500 text-white p-2 hover:bg-orange-400 font-semibold flex flex-row justify-items-center gap-1  rounded-md"><Plus/>Add Menu</button>
                </DialogTrigger>
                <DialogHeader>
                    <DialogTitle>Add A New Menu</DialogTitle>
                    <DialogDescription>
                        Create a menu that will make your restaurant stant out..
                    </DialogDescription>
                    <form onSubmit={submitHandler} className='md:grid md:grid-cols-2 gap-2 space-y-1 md:space-y-0 '>
                        <div className='p-2 flex flex-col gap-2 '>
                            <Label className='text-gray-700 font-medium'>Item</Label>
                            <Input type="text" name='item' value={menu.name} onChange={changeEventHandler} />
                             {
                                errors && <span className="text-red-500 text-sm">{errors.name}</span>
                            }
                        </div>
                        <div className='p-2 flex flex-col gap-2 '>
                            <Label className='text-gray-700 font-medium'>Description</Label>
                            <Input type="text" name='description' value={menu.description} onChange={changeEventHandler} />
                             {
                                errors && <span className="text-red-500 text-sm">{errors.description}</span>
                            }
                        </div>
                        <div className='p-2 flex flex-col gap-2 '>
                            <Label className='text-gray-700 font-medium'>Price</Label>
                            <Input type="number" name='price' value={menu.price} onChange={changeEventHandler} />
                             {
                                errors && <span className="text-red-500 text-sm">{errors.price}</span>
                            }
                        </div>
                        <div className='p-2 flex flex-col gap-2 '>
                            <Label className='text-gray-700 font-medium'>contact</Label>
                            <Input type="file" name='image/*'  onChange={(e) =>setMenu({...menu, images : e.target.files ?  e.target.files?.[0] : null})} />
                             {
                                errors?.images && <span className="text-red-500 text-sm">{errors.images?.name || "image file is required"}</span>
                            }
                        </div>


                        <div className='p-2 flex items-end md:justify-end justify-center'>
                            <DialogFooter>
                                <button type='submit' className='bg-gray-900  text-white p-3 font-semibold mt-2 rounded-md '>Continue To Payment</button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogHeader>

            </Dialog>
        </div>
    )
}

export default AddMenu

