import { Card, CardContent, CardFooter } from "./ui/card"
import pizza3 from "../assets/pizzza3.jpg"
const AvailableMenu = () => {
  return (
    <div className="">
        <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
        <div className="grid md:grid-cols-3 space-y-3 md:space-y-0">

             <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                <img src={pizza3} className="w-full object-cover h-40"/>
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">chicken pizza</h2>
                    <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem vel</p>
                    <h3 className="text-lg text-gray-700 font-semibold mt-4">
                        <span className="text-orange-500">₹80</span> 
                    </h3>
                </CardContent>   
                <CardFooter>
                    <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-center p-2 rounded-md">Add to Cart</button>
                </CardFooter>
             </Card>   
        </div>
    </div>
  )
}

export default AvailableMenu
