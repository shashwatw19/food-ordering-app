import { useParams } from "react-router-dom"
import pizza2 from "../assets/pizza2.jpg"
import { Timer } from "lucide-react"
import AvailableMenu from "./AvailableMenu"
const Restaurant = () => {
    const params = useParams()
    const restaurant = params?.id
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="w-full">
                <div className="relative w-full h-32 md:h-64 lg:h-32">
                    <img src={pizza2} alt="res_img" className="object-cover w-full h-full rounded-lg shadow-lg" />
                </div>
                <div className="flex flex-col md:flex-row  justify-between">
                    <div>
                        <div className="flex flex-col gap-2 my-5">
                            <h1 className="font-medium text-xl">Pizza Hunt</h1>
                            <div className="flex gap-2 my-2">
                                {
                                    ["Biryani", "Momos"].map((cuisine: string, idx: number) => {
                                        return <div>
                                            <span key={idx} className="text-gray-800 font-medium bg-gray-200  rounded-md p-2">{cuisine}</span>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="flex md:flex-row flex-col gap-2 my-5">
                                <div className="flex items-center gap-2">
                                    <Timer className="w-5 h-5" />
                                    <h1 className="flex items-center gap-2 font-medium">Delivery Time :<span className="text-orange-500 ">{35} min</span></h1>

                                </div>
                            </div>
                        </div>
                        <AvailableMenu />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurant
