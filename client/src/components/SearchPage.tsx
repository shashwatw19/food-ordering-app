import { useParams } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import FilterPage from "./FilterPage"
import { Input } from "./ui/input"
import { GlobeIcon,  MapPin, Search, X } from "lucide-react"
import { Card, CardContent , CardFooter} from "./ui/card"
import pizza2 from "../assets/pizza2.jpg"
const SearchPage = () => {
    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const loading = 1;
    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-start gap-2 p-2">
            {/* for filterpage */}
            <div className="p-4">
                <FilterPage />
            </div>

            {/* for seachPage content */}
            <div className="flex flex-col p-4 items-start justify-between gap-3 ">
                {/* for search input & tags*/}
                <div className="flex flex-col justify-between gap-10 items-start w-[90%]">
                    <div className="relative flex flex-row w-full justify-between gap-2">
                        <Input placeholder="Search resturants & cuisines" className="pl-10  text-gray-600" type="text" value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
                        <Search className="absolute inset-y-2 left-2 text-gray-600" />
                        <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-2 py-0.5 rounded-md">Search</button>


                    </div>
                    <div className="flex flex-col md:flex-row gap-5 items-start md:items-baseline justify-between">
                        <h1 className="text-black font-bold text-xl ">(2) Results found </h1>
                        <div className="flex flex-row gap-2 items-center">
                            {
                                ["biryani", "chicken", "noodles"].map((tags: string, index: number) => {
                                    return <div className="relative">
                                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{tags}</span>
                                        <X size={10} className="absolute -inset-y-1 -right-1  text-gray-700" />
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* for searchResults */}
                <div className="grid md:grid-cols-4 ">
                    <Card className="bg-white overflow-hidden dark:bg-gray-800 shadow-xl w-[350px] rounded-xl  ">
                        <div className="relative">
                            <img src={pizza2} className="object-cover overflow-hidden w-full h-full " />
                            <span className="absolute top-1 left-2 bg-gray-200 px-3 py-1 opacity-75 rounded-md">Featured</span>
                        </div>
                        <CardContent className="p-4 flex flex-col gap-2 justify-betweeen">
                            <h1 className="text-xl text-black font-bold">Pizza Hunt</h1>
                            <div className="flex flex-col gap-1 justify-between">
                                <div className="mt-2 gap-1 flex items-center text-gray-700 ">
                                    <MapPin size={16} />
                                    <p className="text-sm">City : <span className="text-gray-800">Delhi</span></p>
                                </div>
                                <div className="mt-2 gap-1 flex items-center text-gray-700 ">
                                    <GlobeIcon size={16} />
                                    <p className="text-sm">Country : <span className="text-gray-800">India</span></p>
                                </div>
                                <div className="flex flex-row mt-2 gap-1">
                                    {
                                        ["biryani", "chicken", "noodles"].map((tags: string, index: number) => {
                                            return <div className="relative">
                                                <span key={index} className="bg-gray-800 text-white px-2 py-1 rounded-md">{tags}</span>
                                                
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        
                        </CardContent>
                       
                        <CardFooter className="flex flex-row -mt-5 border-t-1 p-4 border-gray-200 justify-end items-center">
                            <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold p-2 rounded-full">View Menu</button>
                        </CardFooter>
                    </Card>

                </div>
            </div>


        </div>
    )
}
export default SearchPage
