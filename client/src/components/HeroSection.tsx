import {  Search } from "lucide-react"
import { Input } from "./ui/input"
import pizza from "../assets/pizza.avif"
import React from "react"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {
    const [searchResults , setSearchResults] = React.useState<string>("");
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchResults(e.target.value);
    }
    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 p-5 justify-center md:gap-10 md:mt-5.5 gap-5">
        <div className="flex flex-col gap-6 md:w-[50%] w-full">
            <div className="flex flex-col gap-5 p-2 items-start justify-center">
                <h1 className="font-bold md:font-extrabold md:text-5xl p-2 text-4xl">Order Food Anytime & Anywhere</h1>
                <p className="text-gray-600 text-xl p-2">Hey!!. our delicious food is waiting for you we are always near you.</p>
            </div>
            <div className="flex flex-row gap-2">
                <div  className="relative w-full">
                    <Input placeholder="Enter your location to search restaurants nearby you" className="pl-10 capitalize  rounded-md shadow-lg text-gray-600 text-xl" type="text" value={searchResults }  onChange={handleSearch}/>
                    <Search className="absolute inset-y-2 left-2 text-gray-600"/>
                </div>
                <button onClick={()=>navigate( `/search/${searchResults}`)} className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-2 py-1 rounded-md ">Search</button>
                
            </div>
          
        </div>
        <img src={pizza} className="object-cover w-full md:max-w-[600px] md:max-h-[600px]" />
        
    </div>
  )
}

export default HeroSection
