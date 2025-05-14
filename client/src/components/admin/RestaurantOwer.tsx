import { Label } from "@radix-ui/react-menubar"
import { Input } from "../ui/input"
import { Clock10Icon, ForkKnifeCrossed, Globe2, GlobeIcon, HandPlatter, HomeIcon, HotelIcon, Image, Loader2 } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { RestaurantFormSchema, restaurantFromSchema } from "../../schema/restaurantFormSchema"
const RestaurantOwer = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    address: "",
    images: new File([], 'placeholder.jpg')
  })
  
  const [errors , setErrors] = useState<Partial<RestaurantFormSchema>>({});
  
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input)
    if(!result.success){
         const filedErros = result.error.formErrors.fieldErrors
         setErrors(filedErros as Partial<RestaurantFormSchema>)
         return
    }
       

    // api implementation here
    console.log(input)

    setInput({
      restaurantName: "",
      city: "",
      country: "",
      deliveryTime: 0,
      cuisines: [],
      address: "",
      images: null
    })
  }
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value , type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value  })

  }
  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submitHandler} >
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* restaurant name */}
              <div className="flex relative flex-col gap-2 p-2">
                <Label className="text-gray-800 font-medium">Restaurant Name</Label>
                <Input type="text" name="restaurantName" value={input?.restaurantName} className="pl-9" placeholder="Enter your restaurant name" onChange={changeHandler} />
                <ForkKnifeCrossed className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                {
                  errors && <span className="text-red-500 text-sm">{errors.restaurantName}</span>
                }
              </div>
              <div className="flex flex-col relative items-start gap-2 p-2">
                <Label className="text-gray-800 font-medium">City</Label>
                <Input type="text" name="city" placeholder="Enter your city name"  value={input?.city} className="pl-9" onChange={changeHandler} />
                <HotelIcon className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                 {
                  errors && <span className="text-red-500 text-sm">{errors.city}</span>
                }
              </div>
              <div className="flex flex-col relative gap-2 p-2">
                <Label className="text-gray-800 font-medium">Country</Label>
                <Input type="text" name="country" className="pl-9" placeholder="Enter your country name"  value={input?.country} onChange={changeHandler} />
                <GlobeIcon className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                 {
                  errors && <span className="text-red-500 text-sm">{errors.country}</span>
                }
              </div>
              <div className="flex flex-col relative gap-2 p-2">
                <Label className="text-gray-800 font-medium">Delivery Time</Label>
                <Input type="number" name="deliveryTime" className="pl-9" placeholder="Estimated delivery time"  onChange={changeHandler}  value={input?.deliveryTime}  />
                <Clock10Icon className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                 {
                  errors && <span className="text-red-500 text-sm">{errors.deliveryTime}</span>
                }
              </div>
              <div className="flex flex-col relative gap-2 p-2">
                <Label className="text-gray-800 font-medium">Cuisines</Label>
                <Input type="text" name="cuisines" className="pl-9" placeholder="e.g. Pizza,Momos,Pasta..."  value={input.cuisines}
                  onChange={(e) =>setInput({ ...input, cuisines: e.target.value.split(",") })}   
                 />
                <HandPlatter className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                 {
                  errors && <span className="text-red-500 text-sm">{errors.cuisines}</span>
                }
              </div>
              <div className="flex flex-col relative gap-2 p-2">
                <Label className="text-gray-800 font-medium">Address</Label>
                <Input type="text" name="address" className="pl-9" placeholder="Enter your address"  value={input?.address} onChange={changeHandler} />
                <HomeIcon className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                 {
                  errors && <span className="text-red-500 text-sm">{errors.address}</span>
                }
              </div>
              <div className="flex flex-col relative gap-2 p-2">
                <Label className="text-gray-800 font-medium">Upload Restaurant Banner</Label>
                <Input type="file" accept="image/*" onChange={(e) =>setInput({...input, images : e.target.files ?  e.target.files?.[0] : null,})} className="pl-9" name="images" placeholder="Enter your address"  />
                <Image className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                {
                  errors?.images && <span className="text-red-500 text-sm">{errors.images?.name || "image file is required"}</span>
                }
              </div>
              <div className="flex flex-row items-end md:justify-end justify-center p-2  w-full ">
                {
                  !loading ? <button type="submit" className="bg-orange-500 hover:bg-orange-400 font-semibold text-white p-2 w-full rounded-md">Add Your Restaurant</button> :
                    <button disabled className="bg-orange-400 font-semibold text-white p-2 flex flex-row items-center w-full justify-center gap-2 rounded-md"><Loader2 className="animate-spin" />Adding</button>
                }

              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RestaurantOwer
