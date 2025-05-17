import pizza2 from "../assets/pizza2.jpg"

const Success = () => {
    const orders = [1,2,]
    if(orders?.length==0){
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl dark:text-gray-200 text-gray-600 ">Order not found</h1>
            </div>
        )
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-700 p-4'>
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-full">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 ">
                                Order Status : <span className="text-orange-500">{"confirm".toUpperCase()}</span></h1>
                        </div>
                        <div className="mb-6"> 
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Order Summary</h2>
                            <div className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <div>
                                        <img src={pizza2} alt="" className="w-14 h-14 rounded-md object-cover"/>
                                        <div className="text-gray-800 dark:text-gray-200 text-start font-medium p-1">pizza</div>
                                    </div>
                                    <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium">80</h3>
                                
                                </div>
                                <div className="bg-gray-300 h-[1px] w-full mt-2 mb-3"></div>
                                <div className="flex flex-row justify-center ">
                                        <button className="bg-orange-500 hover:bg-orange-400 text-white rounded-md font-semibold p-2">Continue Shopping</button>
                                </div>
                                
                            </div>
                        </div>
                </div>
        </div>
  )
}

export default Success
