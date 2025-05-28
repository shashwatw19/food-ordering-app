import { useParams } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import FilterPage from "./FilterPage"
import { Input } from "./ui/input"
import { GlobeIcon, MapPin, Search, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import pizza2 from "../assets/pizza2.jpg"
import { useRestaurantStore } from "../store/useRestaurantStore"
import { Link } from "react-router-dom"
const SearchPage = () => {
    const params = useParams()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const appliedFilter = useRestaurantStore((state) => state.appliedFilter)
    const setAppliedFilter = useRestaurantStore((state) => state.setAppliedFilter)
    const searchRestaurant = useRestaurantStore((state) => state.searchRestaurant)
    const searchedRestaurant = useRestaurantStore((state) => state.searchedRestaurant)
    const loading = useRestaurantStore((state => state.loading))


    const handleSearch = async () => {
        const searchText = params.location!
        console.log(searchText)
        try {
            await searchRestaurant(searchText, searchQuery, appliedFilter)
        } catch (e) {
            console.log("error from searchComponent", e)
        }
    }

    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-start gap-2 p-2">
            {/* for filterpage */}
            <div className="p-4">
                <FilterPage />
            </div>

            {/* for seachPage content */}
            <div className="flex flex-col p-4 w-full items-start justify-between gap-3  rounded-md ">
                {/* for search input & tags*/}
                <div className="flex flex-col justify-between gap-10 items-start w-[90%]">
                    <div className="relative flex flex-row w-full justify-between gap-2">
                        <Input placeholder="Search resturants & cuisines" className="pl-10  text-gray-600" type="text" value={searchQuery} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)} />
                        <Search className="absolute inset-y-2 left-2 text-gray-600" />
                        <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-400  text-white font-semibold px-2 py-0.5 rounded-md">Search</button>


                    </div>
                    <div className="flex flex-col md:flex-row gap-5  md:items-baseline justify-between">
                        <h1 className="text-black font-bold text-xl">({searchedRestaurant?.length}) Results found </h1>
                        <div className="flex flex-row gap-2 items-center">
                            {
                                appliedFilter?.map((tags: string, index: number) => {
                                    return <div key={index} className="relative">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{tags}</span>
                                        <X onClick={() => setAppliedFilter(tags)} size={10} className="absolute -inset-y-1 -right-1  text-gray-700" />
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* for searchResults */}
                <div className="flex flex-row items-center gap-5 flex-wrap ">
                    {searchedRestaurant && searchedRestaurant.map((restaurant) => {
                        return <div>
                            <Card className="bg-white dark:bg-gray-800 shadow-xl w-[300px] h-[400px] rounded-xl overflow-hidden flex flex-col justify-between">

                                <div className="relative ">
                                    <img src={pizza2} alt="Restaurant item" className="object-cover w-full h-[120px]" />
                                    <span className="absolute top-1 left-2 bg-gray-200 px-2 py-0.5 opacity-75 rounded-md text-sm">Featured</span>
                                </div>

                                <CardContent className="p-3 flex flex-col gap-2">
                                    <h1 className="text-lg font-bold text-black dark:text-white truncate">{restaurant.restaurantName}</h1>

                                    <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            <p>City: <span className="text-gray-800 dark:text-gray-200">{restaurant.city}</span></p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <GlobeIcon size={14} />
                                            <p>Country: <span className="text-gray-800 dark:text-gray-200">{restaurant.country}</span></p>
                                        </div>

                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <div className="flex flex-wrap gap-1">
                                                {restaurant?.cuisines.slice(0, 4).map((tag: string, index: number) => (
                                                    <span key={index} className="bg-gray-800 text-white px-2 py-0.5 rounded-md text-xs">
                                                        {tag}
                                                    </span>
                                                ))}

                                                {restaurant?.cuisines.length > 4 && (
                                                    <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-md text-xs">
                                                        +{restaurant.cuisines.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>


                                <CardFooter className="border-t p-3 border-gray-200 dark:border-gray-700">
                                    <button className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-3 py-1 rounded-full w-full">
                                        View Menu
                                    </button>
                                </CardFooter>
                            </Card>

                        </div>
                    })}



                </div>
            </div>


        </div>
    )
}
const NoResultFound = ({ searchText }: { searchText: string }) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                No results found
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                We couldn't find any results for "{searchText}". <br /> Try searching
                with a different term.
            </p>
            <Link to="/">
                <button className="mt-4 bg-orange hover:bg-orangeHover">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default SearchPage
