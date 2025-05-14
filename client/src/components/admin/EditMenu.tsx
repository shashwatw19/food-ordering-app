import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-menubar"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { MenuFormSchema, menuFromSchema } from "../../schema/menuFormSchema"
import { Input } from "../ui/input"
import { useState } from "react"

const EditMenu = ({ selected, setSelected }: { selected: boolean, setSelected: Dispatch<SetStateAction<boolean>> }) => {
    const [menu, setMenu] = useState<MenuFormSchema>({
        name: "",
        description: "",
        price: 0,
        images: null
    })
    const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setMenu({ ...menu, [name]: type === "number" ? Number(value) : value })
    }
    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        const result = menuFromSchema.safeParse(menu);
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors
            setErrors(fieldError as Partial<MenuFormSchema>)
            return;
        }

        // edit the menu if any changes occur

    }
    return (
        <Dialog open={selected} onOpenChange={setSelected}>
    
            <DialogContent className="bg-gray-50 rounded-md p-1 mx-auto className='md:grid md:grid-cols-2 gap-2 space-y-1 md:space-y-0 mt-3">
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
                                <Label className='text-gray-700 font-medium'>Image</Label>
                                <Input type="file" name='image/*' onChange={(e) => setMenu({ ...menu, images: e.target.files ? e.target.files?.[0] : null })} />
                                {
                                    errors?.images && <span className="text-red-500 text-sm">{errors.images?.name || "image file is required"}</span>
                                }
                            </div>
                        </div>
                        <div className='p-2 flex items-center w-full justify-center'>
                            <DialogFooter>
                                <button type='submit' className='bg-orange-500  text-white px-3 py-2 font-semibold mt-2 rounded-md '>Edit</button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>

        </Dialog>
    )
}

export default EditMenu