import { useNavigate } from "react-router-dom"
import pizza2 from "../assets/pizza2.jpg"
import { useOrderStore } from "../store/useOrderStore"
import { CartItem } from "../types/cartType"
import { ShoppingCart } from "lucide-react"
import { useEffect } from "react"

const Success = () => {
  const order = useOrderStore((state) => state.order)
  const navigate = useNavigate()
  const getPendingOrders = useOrderStore((state)=>state.getPendingOrders)
  console.log("order from getPending orders..." , order)
useEffect(()=>{
    getPendingOrders()
},[])
  return (
    order.length === 0 ? (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="font-bold text-3xl dark:text-gray-200 text-gray-700 mb-3">No Orders Yet</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          You haven't placed any orders so far. Once you do, they'll show up here.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Browse Restaurants
        </button>
      </div>
    ) : (
      <div className="min-h-screen p-6 flex justify-center bg-gray-white dark:bg-gray-900 ">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg p-6 space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Order Summary
          </h2>

          {order.map((cartForOrder, index) => (
            <div
              key={index}
              className="p-4  bg-gray-100 rounded-2xl border-gray-300"
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Order Status:{" "}
                <span className="text-orange-500 capitalize">{cartForOrder.status}</span>
              </h3>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Total Amount:{" "}
                <span className="text-gray-600">₹{cartForOrder.totalAmount}</span>
              </h3>
              <div className="flex flex-col gap-1 ">
                  <p className="text-lg font-semibold text-gray-700">Restaurant</p>
                   <div className="text-gray-700 p-1">
                    <p className="text-gray-700 font-semibold capitalize">{cartForOrder.restaurant?.restaurantName}</p>
                    <p className="">Address : <span>{cartForOrder.restaurant?.address}</span></p>
                    <p>Estimated delivery : <span>{cartForOrder.restaurant?.deliveryTime} min</span></p>
                   </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cartForOrder?.cartItems?.map((item: CartItem, i: number) => (
                  <div
                    key={i}
                    className="flex flex-col items-start white dark:bg-gray-800 rounded-md p-3 shadow-sm"
                  >
                    <img
                      src={item.imageUrl || pizza2}
                      alt={item.name}
                      className="w-full h-28 object-cover rounded-md mb-2"
                    />
                    <div className="flex flex-row items-center justify-between  w-full">
                      <p className="text-gray-800 dark:text-gray-200 font-semibold capitalize"> {item.name}</p> 
                      <p className="font-medium text-gray-600 ">x{item.quantity}</p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-600">₹{item.price.toString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              className="bg-orange-500 hover:bg-orange-400 text-white rounded-md font-semibold flex items-center gap-2 px-5 py-2"
              onClick={() => navigate('/')}
            >
              <ShoppingCart className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default Success



// import { useNavigate } from "react-router-dom"
// import pizza2 from "../assets/pizza2.jpg"
// import { useOrderStore } from "../store/useOrderStore"
// import { CartItem } from "../types/cartType"
// import { ShoppingCart } from "lucide-react"


// const Success = () => {
//     const order = useOrderStore((state) => state.order)
//     const navigate = useNavigate()
//     console.log("order.. ", order)
//     return (
//         order.length == 0 ?
//             <>
//                 <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//                     <h1 className="font-bold text-3xl dark:text-gray-200 text-gray-700 mb-4">No Orders Yet</h1>
//                     <p className="text-gray-500 dark:text-gray-400 mb-6">
//                         You haven't placed any orders so far. Once you do, they'll show up here.
//                     </p>
//                     <a
//                         href="/" // update this to your actual route
//                         className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition"
//                     >
//                         Browse Restaurants
//                     </a>
//                 </div>

//             </> :
//             <div className='flex items-center w-7xl mx-auto justify-center  min-h-screen  dark:bg-gray-700 p-4'>
//                 <div className="bg-white  dark:bg-gray-800 shadow-lg rounded-lg p-6 ">
                    
//                     <div className="mb-6">
//                         <h2 className="font-semibold text-gray-700 dark:text-gray-300 mb-4 text-xl">Order Summary</h2>
//                         <div className="flex flex-row gap-2 flex-wrap  ">
//                             {
//                             order.map((cartForOrder) => {

//                                 return <div className="bg-gray-white  rounded-md p-3">
//                                     <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 ">
//                                         Order Status : <span className="text-orange-500">{cartForOrder.status.toUpperCase()}</span></h1>
//                                     <div className="">
//                                         {
//                                         cartForOrder?.cartItems?.map((item: CartItem) => {
//                                             return <div className="mb-4 ">
//                                                 <div className="flex justify-between  items-baseline">
//                                                     <div>
//                                                         <img src={item.imageUrl || pizza2} alt="" className="w-14 h-14 rounded-md object-cover" />
//                                                         <div className="text-gray-800 dark:text-gray-200 text-start font-medium p-1 capitalize">{item.name}</div>
//                                                     </div>
//                                                     <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">₹{item.price.toString()}</h3>

//                                                 </div>
//                                                 <div className="bg-gray-300 h-[1px] w-full mt-2 mb-3"></div>


//                                             </div>
//                                         })
//                                     }
//                                     </div>
//                                     </div>
//                             })
//                         }
//                         </div>
//                     </div>
//                     <div className="flex flex-row justify-center ">
//                         <button className="bg-orange-500 hover:bg-orange-400 text-white rounded-md font-semibold  flex justify-center gap-2 p-2" onClick={() => navigate('/')}><ShoppingCart />Continue Shopping</button>
//                     </div>
//                 </div>
//             </div>
//     )
// }

// export default Success
