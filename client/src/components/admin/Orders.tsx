import { Label } from "@radix-ui/react-menubar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "../ui/select"


const Orders = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 p-4">
       <div className="text-3xl font-semibold text-gray-900 dark:text-white mb-10">Orders Overview</div>     
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between md:items-baseline items-start dark:bg-gray-900 shadow-lg rounded-xl md:p-6 p-8 border border-gray-200  dark:border-gray-800">
                    <div className="flex-1 mb-6 sm:mb-0">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 "></h1>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                            <span className="font-semibold">Address : </span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            <span className="font-semibold">Total Amount : </span>
                            Lorem ipsum dolor sit amet.
                        </p>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3 flex flex-col gap-2 items-start juystify-between" >
                        <Label className="block test-sm font-medium text-gray-700 dark:text-gray-300 ">Order Status</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue  placeholder="Select Status"/>
                            </SelectTrigger>
                            <SelectContent>
                                    <SelectGroup>
                                        {
                                            ["Pending" , "Confirm" , "Preparing" , "OutforDelivery" , "Delivered"]?.map((option : string , index : number)=><SelectItem key={index} value={option.toLowerCase()}>{option}</SelectItem>)
                                        }
                                    </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>  
            </div>
        </div>
    </div>
  )
}

export default Orders
