import { Card, CardContent, CardFooter } from "./ui/card"
import pizza3 from "../assets/pizzza3.jpg"
import { useRestaurantStore } from "../store/useRestaurantStore"
import { MenuItem } from "../types/restaurantType"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "../store/useCartStore"
import { CartItem } from "../types/cartType"
import { RemoveCartDialog } from "./RemoveCartDialog"
import { useState } from "react"

const AvailableMenu = ({currRestaurant_id} : {currRestaurant_id : string}) => {
  const restaurant = useRestaurantStore((state) => state.restaurant)
  const cart = useCartStore((state) => state.cart)
  const availableMenu = restaurant?.menu
  const addToCart = useCartStore((state) => state.addToCart)
  const incrementItem = useCartStore((state)=>state.incrementItem)
  const decrementItem = useCartStore((state)=>state.decrementItem)
  const findItemInCart = useCartStore((state) => state.findItemInCart)
  const removeFromCart = useCartStore((state)=>state.removeFromCart)
  const resetCart = useCartStore((state)=>state.resetCart)
  const [open , setOpen] = useState<boolean>(false)
  const handleDecrementItem = (item: CartItem , )=>{
        if( item.quantity > 1){
            decrementItem(item._id)
        }
        else{
            removeFromCart(item._id)
        }
    }
  const restaurantId = useCartStore((state)=>state.restaurantId)
  console.log("restaurantId " , restaurantId)
  const handleAddToCart = (item : MenuItem)=>{
      const cartResposne = addToCart(item , currRestaurant_id)
      if(!cartResposne){
        setOpen(true)
        return
      }
       
  }
  const onConfirm = ()=>{
    resetCart()
    useCartStore.setState({restaurantId : null})
  }
  return (
    <div className="max-w-7xl mx-auto min-h-screen rounded-md  ">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {
          availableMenu?.length === 0 ? (
            <p className="text-lg text-gray-700">This restaurant has no menu available..</p>
          ) : (
            availableMenu?.map((menu: MenuItem, idx: number) => (
              <Card
                key={idx}
                className="bg-white dark:bg-gray-800 shadow-xl w-[250px] h-[350px] rounded-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="-mt-6">
                  <img src={menu?.imageUrl || pizza3} alt="Restaurant item" className="object-cover w-full h-[120px]" />
                </div>
                <CardContent className="p-3 flex flex-col gap-2 -mt-5">
                  <h1 className="text-lg font-bold text-black dark:text-white truncate capitalize">
                    {menu.name}
                  </h1>

                  <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <div className="flex items-center gap-1">

                      <span className="text-gray-800 dark:text-gray-200 capitalize">
                        {menu.description?.length >= 50 ? menu.description.slice(0, 60) + '...' : menu.description}
                      </span>

                    </div>

                    <div className="flex items-center gap-1">
                      <p>
                        <span className="text-orange-500 font-semibold capitalize">
                          ₹{menu.price.toString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="border-t -mt-4 border-gray-200 dark:border-gray-700">
                  {
                    findItemInCart(menu as any) ? (
                      (() => {
                        const cartItem = cart.find((cartItem) => cartItem._id === menu._id);
                        return (
                          <div className="flex items-center justify-between w-full gap-2">
                            <button
                              onClick={() => handleDecrementItem(cartItem!)}
                              className="bg-gray-200  text-black font-bold px-3 py-1 rounded-full text-lg"
                              
                            >
                              –
                            </button>
                            <span className="font-semibold text-sm text-gray-800 bg-gray-50 p-2 w-full rounded-full text-center ">
                              {cartItem?.quantity}
                            </span>
                            <button
                              onClick={() => incrementItem(menu._id)}
                              className="bg-orange-500 hover:bg-orange-400 font-bold text-white px-3 py-1 rounded-full text-lg"
                            >
                              +
                            </button>
                          </div>
                        );
                      })()
                    ) : (
                      <button
                        onClick={() => handleAddToCart(menu)}
                        className="bg-orange-500 hover:bg-orange-400 text-white text-sm flex justify-center items-center gap-3 font-medium px-3 py-2 text-center rounded-full w-full"
                      >
                        <ShoppingCart className="text-white font-semibold" size={20} />
                        Add To Cart
                      </button>
                    )
                  }
                </CardFooter>

              </Card>
            ))
          )
        }

      </div>
      <RemoveCartDialog open={open} setOpen={setOpen} onConfirm={onConfirm}/>
      
    </div>
  )
}

export default AvailableMenu


