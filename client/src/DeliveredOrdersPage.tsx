import { useEffect } from "react"
import { useOrderStore } from "./store/useOrderStore"
import { Card } from "./components/ui/card";

import { CardContent } from "./components/ui/card";
const DeliveredOrdersPage = () => {
  const order = useOrderStore((state) => state.order)
  const getOrdersForUser = useOrderStore((state) => state.getOrdersForUser)
  console.log("orders from delivered page", order)
  useEffect(() => {
    getOrdersForUser()
  }, [])

  return (
    <div className="p-10 max-w-4xl min-h-screen mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Delivered Orders</h1>

      <div className="grid gap-6">
        {
          order.length == 0 ?
            <div className="flex flex-col items-center justify-center text-center text-orange-500 py-20">
              <h2 className="text-xl font-semibold">No Delivered Orders Yet</h2>
              <p className="text-sm text-gray-500 mt-2">Once your orders are delivered, they will appear here.</p>
            </div>
            :
            <>
              {
                order.map((order) => {
                  return <Card key={order._id} className="bg-gray-50 shadow-sm border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between flex-wrap items-center mb-4">
                        <h2 className="text-xl font-medium text-orange-700">Order ID: {order._id}</h2>
                        <p className="text-orange-600 border-orange-400 capitalize">{order.status}</p>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">Delivered to: <span className="font-medium text-black">{order.DeliveryDetails.fullname}</span></p>
                        <p className="text-sm text-gray-600">Address: {order.DeliveryDetails.address}, {order.DeliveryDetails.city}</p>
                        <p className="text-sm text-gray-600">Contact: {order.DeliveryDetails.contact}</p>
                      </div>
                      {order.restaurant && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-700">Restaurant: <span className="font-medium text-black">{order.restaurant.restaurantName}</span></p>
                          <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                          <p className="text-sm text-gray-600">City: {order.restaurant.city}</p>
                        </div>
                      )}
                      <div>
                        <h3 className="text-gray-800 font-medium mb-2">Items:</h3>
                        <ul className="text-sm space-y-1">
                          {order.cartItems.map((item, idx) => (
                            <li key={idx} className="text-gray-700 flex flex-row gap-2 justify-between  border-gray-200 border-b-1 ">
                              <p>{item.name} x{item.quantity}</p>   
                              <p>₹{item.price.toString()}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {order.totalAmount && (
                        <p className="text-right text-orange-700 font-semibold mt-4">Total: ₹{(Number(order.totalAmount) / 100).toString()}</p>
                      )}
                    </CardContent>
                  </Card>
                })
              }
            </>
        }
      </div>

    </div>
  );
};
export default DeliveredOrdersPage
