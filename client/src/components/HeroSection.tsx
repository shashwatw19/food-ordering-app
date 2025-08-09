import {  Search } from "lucide-react"
import { Input } from "./ui/input"
import React from "react"
import { useNavigate } from "react-router-dom"
import JoinWithUsPage from "./JoinWithUs"
import AvailabilityPage from "./AvailabilityPage"
import thali from "../assets/thali.jpg"
import { toast } from "sonner"
const HeroSection = () => {
    const [searchResults , setSearchResults] = React.useState<string>("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchResults(e.target.value);
    }
    const navigate = useNavigate()
  return (
    <>
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-15 p-5  min-h-screen justify-center md:gap-10 md:mt-5.5 gap-5">
        <div className="flex flex-col gap-6 md:w-[50%] w-full">
            <div className="flex flex-col gap-5 p-2 items-start justify-center">
                <h1 className="font-bold md:font-extrabold md:text-5xl p-2 text-4xl">Your Favorite Food, Just a Tap Away.</h1>
                <p className="text-gray-600 text-xl p-2">Craving something delicious? We're just around the corner!</p>
            </div>
            <div className="flex flex-row gap-2">
                <div  className="relative w-full">
                    <Input placeholder="Enter your location to search restaurants nearby you" className="pl-10 capitalize  rounded-md shadow-lg text-gray-600 " type="text" value={searchResults }  onChange={handleSearch}/>
                    <Search className="absolute inset-y-2 left-2 text-gray-600"/>
                </div>
                <button onClick={()=>{
                    if(searchResults.trim() === ""){
                        toast.info('Enter a valid city name!')
                    }
                    else{
                        navigate( `/search/${searchResults}`)
                    }
                 
                }} className="bg-gradient-to-br from-orange-300 to-orange-600 text-white font-semibold px-2 py-1 rounded-md ">Search</button>
                
            </div>
          
        </div>
        <img src={thali} className="object-cover w-full md:max-w-[600px] md:max-h-[600px] rounded-full" />

       
    </div>
    <AvailabilityPage/>
     <div id="join-with-us">
        < JoinWithUsPage/>
     </div>

     </>
  )
}

export default HeroSection
