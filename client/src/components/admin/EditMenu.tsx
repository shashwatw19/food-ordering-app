import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Label } from "@radix-ui/react-menubar"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect } from "react"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { MenuFormSchema, menuFromSchema } from "../../schema/menuFormSchema"
import { Input } from "../ui/input"
import { useState } from "react"
import { MenuItem } from "../../types/restaurantType"
import { useMenuStore } from "../../store/useMenuStore"

const EditMenu = ({ editOpen , selectedMenu , setSelectedMenu , setEditOpen , setUpdateMenu }: { editOpen: boolean, selectedMenu : MenuItem ,  setSelectedMenu: Dispatch<SetStateAction<MenuItem>>  , setEditOpen : Dispatch<SetStateAction<boolean>> , setUpdateMenu : Dispatch<SetStateAction<boolean>> }) => {
    const [menu, setMenu] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        images: undefined,
        _id : ""
    })
    console.log("Selected Menu..." , selectedMenu)
    const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})
    const updateMenu = useMenuStore((state)=>(state.updateMenu))
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setMenu({ ...menu, [name]: type === "number" ? Number(value) : value })
    }
    const submitHandler = async(e: FormEvent) => {
        e.preventDefault()
        const result = menuFromSchema.safeParse(menu);
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<MenuFormSchema>)
            return;
        }
        console.log("updated Menu" , menu)
        try{
            const formData = new FormData()
            formData.append("name" , menu.name)
            formData.append("description" , menu.description)
            formData.append("price" , menu.price.toString())
            formData.append("_id" , menu._id || "")
             if(menu?.images){
                formData.append("image" , menu.images)
            }

           const response = await updateMenu(formData)
           if(response){
                setUpdateMenu(true)
           }
        }catch(e){  
            console.log("error from update Menu Component" , e)
        }finally{
            setEditOpen(false)
            setMenu({
                 name: "",
                description: "",
                price: 0,
                images: undefined,
                _id : ""
            })
        }
       

    }
    useEffect(()=>{
        setMenu({
            name: selectedMenu.name,
        description: selectedMenu.description,
        price: Number(selectedMenu.price),
        images: undefined,
        _id : selectedMenu._id
        })
    },[selectedMenu])
    
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
    
            <DialogContent className="bg-gray-50 rounded-md p-1 mx-auto">
                <DialogHeader>
                    <div className="p-2">
                        <DialogTitle className="text-xl font-medium   text-center">Edit Menu</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500 text-center">
                            Changes made here will be displayed at your restaurant page
                        </DialogDescription>
                    </div>
                    <form onSubmit={submitHandler} >
                        <div className='md:grid md:grid-cols-2 space-y-1 md:space-y-0 '>
                            <div className='p-2 flex flex-col items-start gap-1 '>
                                <Label className='text-gray-700 font-medium'>Item</Label>
                                <Input type="text" autoFocus={false} name='name' value={menu.name} onChange={changeEventHandler} />
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
                                <button type='submit' className='bg-orange-500  text-white px-3 py-2 font-semibold mt-2 rounded-md '>Confirm</button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>

        </Dialog>
    )
}

export default EditMenu