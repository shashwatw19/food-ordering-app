import { useParams } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import FilterPage from "./FilterPage"
import { Input } from "./ui/input"
import { Building2, MapPin, Search, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "./ui/card"
import Loading from "./Loading"
import { useRestaurantStore } from "../store/useRestaurantStore"
import { Link } from "react-router-dom"
import { useEffect } from "react"
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
        console.log(searchText , appliedFilter, searchQuery)
        try {
            await searchRestaurant(searchText, searchQuery, appliedFilter)
        } catch (e) {
            console.log("error from searchComponent", e)
        }
    }
    useEffect(() => {
        handleSearch()
    }, [params.location!])
    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen items-start justify-start gap-2 p-2">
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
                        {
                            searchedRestaurant?.length && searchedRestaurant?.length > 0 ? <h1 className="text-black font-bold text-xl">({searchedRestaurant?.length}) Results found </h1> : <></>
                        }
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
                {
                    loading ? <Loading /> :
                        <>
                            {
                                !loading && searchedRestaurant?.length == 0 ? (<NoResultFound searchText={params.location!} />) :
                                    <div className="flex flex-row items-center gap-5 flex-wrap">
                                        {searchedRestaurant && searchedRestaurant.map((restaurant) => {
                                            return <div>
                                                <Card className="bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 w-[280px] h-[420px] rounded-2xl overflow-hidden flex flex-col justify-between border border-gray-100 dark:border-gray-800">

                                                    {/* Image Section */}
                                                    <div className="relative">
                                                        <img
                                                            src={restaurant.imageUrl}
                                                            alt={restaurant.restaurantName}
                                                            className="object-cover w-full h-[100px]"
                                                        />
                                                        <span className="absolute top-2 left-2 bg-orange-100 text-orange-600 font-medium px-2 py-0.5 rounded-md text-xs shadow-sm">
                                                            Featured
                                                        </span>
                                                    </div>

                                                    {/* Scrollable Content Area */} 
                                                    <CardContent className=" text-sm ">
                                                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate capitalize">
                                                            {restaurant.restaurantName}
                                                        </h1>

                                                        <div className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Building2 size={16} className="text-orange-500" />
                                                                <span className="capitalize">{restaurant.city}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <MapPin size={16} className="text-orange-500" />
                                                                <span className="capitalize">{restaurant.address}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap gap-1 mt-3">
                                                            {restaurant.cuisines.slice(0, 3).map((tag, index) => (
                                                                <span key={index} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {restaurant.cuisines.length > 3 && (
                                                                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                    +{restaurant.cuisines.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </CardContent>

                                                    {/* Footer Always Visible */}
                                                    <CardFooter className="border-t border-gray-200 dark:border-gray-700 px-3 py-3">
                                                        <Link
                                                            to={`/restaurant/${restaurant._id}`}
                                                            className="bg-orange-500 hover:bg-orange-400 transition-colors duration-200 text-white text-sm font-semibold px-4 py-2 rounded-full text-center w-full"
                                                        >
                                                            View Menu
                                                        </Link>
                                                    </CardFooter>
                                                </Card>


                                            </div>
                                        })}
                                    </div>
                            }
                        </>

                }

            </div>


        </div>
    )
}
const NoResultFound = ({ searchText }: { searchText: string }) => {
    return (
        <div className="text-center p-4 mx-auto bg-gray-100 rounded-md">
            <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                No results found
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                We couldn't find any results for "{searchText}". <br /> Try searching
                with a different term.
            </p>
            <Link to="/">
                <button className="mt-4 bg-gray-700 hover:bg-gray-600 p-2 text-white font-semibold rounded-md">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default SearchPage




{/* <Card className="bg-white dark:bg-gray-800 shadow-xl w-[280px] h-[400px] rounded-xl overflow-hidden flex flex-col justify-between ">

                                            <div className="relative ">
                                                <img src={restaurant.imageUrl} alt="Restaurant item" className="object-cover w-full h-[120px]" />
                                                <span className="absolute top-1 left-2 bg-gray-200 px-2 py-0.5 opacity-75 rounded-md text-sm">Featured</span>
                                            </div>

                                            <CardContent className="p-3 flex flex-col gap-2">
                                                <h1 className="text-lg font-bold text-black dark:text-white truncate capitalize">{restaurant.restaurantName}</h1>

                                                <div className="space-y-1 text-gray-700 dark:text-gray-300 text-sm ">
                                                    <div className="flex items-center gap-1">
                                                        <Building2 size={14} />
                                                        <p>City: <span className="text-gray-800 dark:text-gray-200 capitalize">{restaurant.city}</span></p>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        <p>Address: <span className="text-gray-800 dark:text-gray-200 capitalize">{restaurant.address} </span></p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-1 mt-2">
                                                        <div className="flex flex-wrap gap-1 ">
                                                            {restaurant?.cuisines.slice(0, 3).map((tag: string, index: number) => (
                                                                <span key={index} className="bg-gray-800 text-white px-2 py-0.5 rounded-md text-xs ">
                                                                    {tag}
                                                                </span>
                                                            ))}

                                                            {restaurant?.cuisines.length > 3 && (
                                                                <span className="bg-gray-200 text-gray-800 px-2 py-0.5 p-0.5 rounded-md text-xs ">
                                                                    +{restaurant.cuisines.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>


                                            <CardFooter className="border-t -mt-4 border-gray-200 dark:border-gray-700">
                                                <Link to={`/restaurant/${restaurant._id}`} className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-3  py-1 text-center rounded-full w-full">View Menu</Link>
                                            </CardFooter>
                                        </Card> */}
