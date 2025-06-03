import { Label } from "@radix-ui/react-menubar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select"
import { useOrderStore } from "../../store/useOrderStore"
import { useEffect, useState } from "react"


const Orders = () => {
    const findOrderForRestaurant = useOrderStore((state) => state.findOrderForRestaurant)
    const updateStatus = useOrderStore((state) => state.updateStatus)
    const order = useOrderStore((state) => state.order)
    console.log("order for restaurant", order)
    const [statusMap , setStatusMap] = useState<{[key : string] : string}>({})

    // ************need to adjust the ui according to the orders...**********
    useEffect(() => {
        findOrderForRestaurant()
    }, [])
    useEffect(()=>{
        const initialStatusForOrders : { [key : string] : string } = {}
        order.forEach((order)=>{
            initialStatusForOrders[order._id] = order.status.toLowerCase()
        })
        setStatusMap(initialStatusForOrders)
    },[order])
    return (
        <div className="max-w-6xl mx-auto py-10 p-4">
            <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Orders Overview</div>
            <div className="space-y-8">
                {
                    order.length == 0 ?
                        <div></div> :
                        <div>
                            {
                                order.map((order) => {
                                    return <div className="flex flex-col md:flex-row justify-between gap-4 md:items-baseline items-start dark:bg-gray-900 shadow-lg rounded-xl md:p-6 p-8 border border-gray-200  dark:border-gray-800">
                                        <div className="flex-1 mb-6 sm:mb-0">
                                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 "></h1>
                                            <div>
                                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                                    <span className="font-semibold  capitalize">Name : </span>{order?.DeliveryDetails?.fullname}</p>
                                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                                    <span className="font-semibold">Address : </span>{order?.DeliveryDetails?.address}</p>
                                                    <span className="font-semibold text-gray-600">Order</span>
                                                <div className=" flex flex-col gap-2  p-1">
                                                    {order.cartItems.map((item)=>{
                                                        return <div className="flex flex-row  text-gray-700 border border-gray-200 p-2 rounded-md gap-10 justify-between">
                                                            <p>{item.name}</p>
                                                            <p>x{item.quantity}</p>
                                                        </div>
                                                    })}
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                                    <span className="font-semibold">Total Amount : </span>
                                                    ₹{(Number(order.totalAmount) / 100).toString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/3 flex flex-col gap-2 items-start juystify-between" >
                                            <Label className="block test-sm font-medium text-gray-700 dark:text-gray-300 ">Order Status</Label>
                                            <Select value={statusMap[order._id]}
                                                    onValueChange={async(value)=>{
                                                        setStatusMap((prev)=>({
                                                            ...prev , [order._id] : value
                                                        }))
                                                        updateStatus({order_id : order._id , status : value})
                                                    }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {
                                                            ["Pending", "Confirm", "Preparing", "OutforDelivery", "Delivered"]?.map((option: string, index: number) => <SelectItem key={index} value={option.toLowerCase()}>{option}</SelectItem>)
                                                        }
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Orders
