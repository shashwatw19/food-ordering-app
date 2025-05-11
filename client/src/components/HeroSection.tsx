import {  Search } from "lucide-react"
import { Input } from "./ui/input"
import pizza from "../assets/pizza.avif"
import React from "react"

const HeroSection = () => {
    const [country , setCountry] = React.useState<string>("")
   
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 p-5 justify-center md:gap-10 md:mt-5.5 gap-5">
        <div className="flex flex-col gap-6 md:w-[50%] w-full">
            <div className="flex flex-col gap-5 p-2 items-start justify-center">
                <h1 className="font-bold md:font-extrabold md:text-5xl p-2 text-4xl">Order Food Anytime & Anywhere</h1>
                <p className="text-gray-600 text-xl p-2">Hey!!. our delicious food is waiting for you we are always near you.</p>
            </div>
            <div className="flex flex-row gap-2">
                <div  className="relative w-full">
                    <Input placeholder="Enter you country" className="pl-10  rounded-md shadow-lg  text-gray-600 " type="text" value={country }  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setCountry(e.target.value)}/>
                    <Search className="absolute inset-y-2 left-2 text-gray-600"/>
                </div>
                <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold p-2 rounded-md ">Search</button>
                
            </div>
          
        </div>
        <img src={pizza} className="object-cover w-full md:max-w-[600px] md:max-h-[600px]" />
        
    </div>
  )
}

export default HeroSection
