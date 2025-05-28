import { ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
function ForgotPassword() {
    
    const [email , setEmail] = useState<string>("")
    const [loading , setLoading] = useState<boolean>(false)
    const changeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
    }

    const submitHandler = (e : FormEvent)=>{
        e.preventDefault()
        console.log(email)
    }
  return (
   <div className="flex justify-center flex-col gap-4 items-center w-screen h-screen ">
        <form onSubmit={submitHandler} className="flex flex-col items-center gap-6 max-w-md w-full border-gray-400 rounded-lg ">
            <div>
                <div >
                    <h2 className="text-black font-bold text-2xl text-center">Forgot Password</h2>
                    <p className="text-sm text-gray-600">enter your email to reset your password</p>
                </div>
            </div>
            
            <div className="relative w-full">
                <Input placeholder="Email" onChange={changeHandler} value={email} type="email" name="email"  className="pl-10 focus-visible:ring-0" />
                <Mail className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" ></Mail>
            </div>
            
            {
                !loading ? <button className="text-white font-semibold bg-orange-500 hover:bg-orange-400 rounded-md w-full p-2">Send Rest Link</button> : 
                <button disabled className="text-white font-semibold bg-orange-400 rounded-md w-full flex flex-row  items-center gap-2 justify-center p-2"><Loader2 className="text-white text-xs animate-spin"></Loader2>Please Wait</button>
            }
            
        </form>
        <p className="text-sm text-left">Back to <Link to="/login" className="text-blue-600 text-sm hover:underline">login</Link></p>
   </div>
  )
}

export default ForgotPassword
