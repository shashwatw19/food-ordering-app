
import React, { useRef, useState } from "react";
import { Avatar  } from "./ui/avatar";
import { Loader2, LocateIcon, Mail, MapPin, PhoneIcon, Plus, } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import userImage from "../assets/user.png"
import { useUserStore } from "../store/useUserStore";
export type UpdateProfileInput = {
  fullname : string,
  city : string,
  image:  string | Blob,
  address  : string
  
}
const Profile = () => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string | null>(null);
  const loading = useUserStore((state)=>state.loading)
  const [input , setInput] = useState<UpdateProfileInput>({
    fullname : "",
    city : "",
    image  : "",
    address: ""
  })

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedProfilePicture(URL.createObjectURL(file)); // For preview only based 64
    setInput((prevData) => ({
      ...prevData,
      image: file, // Store the File object itself
    }));
  }
  };

  const updateProfile = useUserStore((state)=>state.updateProfile)
  const user = useUserStore((state)=>state.user)
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input changes
    const {name , value } = event.target
    setInput({...input , [name] : value});
  };

  const updateProfileHandler = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("input from update profile" , input)
    
    try{
      const formData = new FormData()
    formData.append("fullname " , input.fullname)
    formData.append("city" , input.city)
    formData.append("image" , input.image)
    formData.append("address" , input.address)
      
    await updateProfile(formData)

    }catch(e){
      console.log("some error occured in Profile Component" , e)
    }

  };

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl min-h-screen mx-auto my-15 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <img src={selectedProfilePicture !== null ? selectedProfilePicture : ( user?.avatarImage || userImage) } />
            <input
              ref={imageRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div onClick={() => imageRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gray-500 bg-opacity-50 rounded-full cursor-pointer">
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            value={input.fullname}
            placeholder={user?.fullname}
            onChange={changeHandler}
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 ">
        <div className="flex items-center  gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
            disabled
              name="email"
              value={user?.email}
              onChange={changeHandler}
              placeholder={user?.email}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              name="address"
              value={input?.address}
              onChange={changeHandler}
              placeholder={user?.address}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent capitalize outline-none border-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPin className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              name="city"
              value={input?.city}
              onChange={changeHandler}
              placeholder={user?.city}
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent capitalize outline-none border-none"
            />
          </div>
        </div>
         
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <PhoneIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Contact</Label>
            <input
              name="contact"
              value={user?.contact}
              onChange={changeHandler}
              disabled 
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>
      <div className="flex w-[50%] items-center  justify-start">
        {loading ? (
          <Button disabled className="bg-gray-800 w-[40%] flex  justify-center items-center hover:bg-hoverOrange">
            <Loader2 className="animate-spin " />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" className="bg-gray-800 w-[40%] hover:bg-hoverOrange">Update</Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
