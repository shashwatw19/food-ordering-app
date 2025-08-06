import { Label } from "@radix-ui/react-menubar"
import { Input } from "../ui/input"
import { Clock10Icon, ForkKnifeCrossed, Globe2, GlobeIcon, HandPlatter, HomeIcon, HotelIcon, Image, Loader2 } from "lucide-react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { RestaurantFormSchema, restaurantFromSchema } from "../../schema/restaurantFormSchema"
import { useRestaurantStore } from "../../store/useRestaurantStore"


const RestaurantOwer = () => {
  const restaurant = useRestaurantStore((state)=>state.restaurant);
  const getRestaurant = useRestaurantStore((state)=>state.getRestaurant)
  const createRestaurant = useRestaurantStore((state)=>state.createRestaurant)
  const updateRestaurant = useRestaurantStore((state)=>state.updateRestaurant)
  const loading = useRestaurantStore((state)=>state.loading)
  const [update , setUpdate] = useState<boolean>(false)
  const [cuisinesInput, setCuisinesInput] = useState<string>("") // Separate state for cuisine input
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
  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFromSchema.safeParse(input)
    if(!result.success){
         const filedErros = result.error.formErrors.fieldErrors
         setErrors(filedErros as Partial<RestaurantFormSchema>)
         return
    }
       
  console.log("input from cuisines array" , input.cuisines)

    // api implementation here
   
    try{
      const formData = new FormData()
      formData.append("restaurantName" , input.restaurantName)
      formData.append("city" , input.city)
      formData.append("deliveryTime" , input.deliveryTime.toString())
      formData.append("cuisines" , JSON.stringify(input.cuisines))
      formData.append("address" , input.address)
      formData.append("country" , input.country)
      if(input.images){
        formData.append("image", input.images)
      }

      if(restaurant){
        const response = await updateRestaurant(formData);
        if(response){
          setUpdate(true)
        }
      }else{
          const response =  await createRestaurant(formData);
          if(response){
            setUpdate(true)
          }
      }
      
    }catch(e){
      console.log("error in restaurant component" , e)
    }
    setInput({
      restaurantName: "",
      city: "",
      country: "",
      deliveryTime: 0,
      cuisines: [],
      address: "",
      images: undefined
    })
    setCuisinesInput("") // Clear the cuisines input field
  }
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value , type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value  })
  }

  useEffect(()=>{
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        const cuisinesArray = Array.isArray(restaurant.cuisines) 
          ? restaurant.cuisines.map((cuisine: string) => cuisine.trim())
          : [];
        
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          cuisines: cuisinesArray,
          images : undefined,
          address : restaurant.address || ""
        });
        
        // Set the cuisines input field with the joined string
        setCuisinesInput(cuisinesArray.join(", "));
      };
      setUpdate(false)
    }
    fetchRestaurant();
  },[update])
  return (
    <div className="max-w-6xl mx-auto my-10 p-4">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">{restaurant != null ? 'Update Restaurant' : 'Add Restaurant'}</h1>
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
                <Input 
                  type="text" 
                  name="cuisines" 
                  className="pl-9" 
                  placeholder="e.g. Kadhai Paneer, Butter Chicken, Pasta..."  
                  value={cuisinesInput}
                  onChange={(e) => {
                    setCuisinesInput(e.target.value);
                    // Update the cuisines array in real-time
                    const cuisinesArray = e.target.value
                      .split(",")
                      .map(item => item.trim())
                      .filter(item => item.length > 0);
                    setInput({ ...input, cuisines: cuisinesArray });
                  }}   
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
                <Input type="file" accept="image/*" onChange={(e) =>setInput({...input, images : e.target.files ?  e.target.files?.[0] : undefined,})} className="pl-9" name="images" placeholder="Enter your address"  />
                <Image className="absolute inset-y-12 left-3 text-gray-600  ml-1 " size={20} />
                {
                  errors?.images && <span className="text-red-500 text-sm">{errors.images?.name || "image file is required"}</span>
                }
              </div>
              <div className="flex flex-row items-end md:justify-end justify-center p-2  w-full ">
                {
                  !loading ? <button type="submit" className="bg-orange-500 hover:bg-orange-400 font-semibold text-white p-2 w-full rounded-md">{restaurant == null ? "Add Your Restaurant" : "Update Your Restaurant"}</button> :
                    <button disabled className="bg-orange-400 font-semibold text-white p-2 flex flex-row items-center w-full justify-center gap-2 rounded-md"><Loader2 className="animate-spin" />{restaurant == null ? "Adding..." : "Updating..."}</button>
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
