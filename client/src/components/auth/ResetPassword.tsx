import { Input } from "../ui/input"
import { Loader2 } from "lucide-react"
import { LockKeyholeIcon } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"
const ResetPassword = () => {
    const loading  = false
    const [password , setPassword] = useState<string>("")
    
    const changeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value)
    }
    const submitHandler = (e  : FormEvent)=>{
        e.preventDefault();
        console.log(password)
        setPassword("")
    }
    return (
        <div className="flex h-screen w-screen justify-center items-center max-w-screen flex-col gap-2 ">
            <form onSubmit={submitHandler} className=" flex flex-col items-center gap-5 w-full max-w-md" >
                <div className="flex flex-col items-center">
                    <p className="font-bold text-black text-2xl">Reset Password</p>
                    {/* <p className="text-sm text-gray-700 ">enter your new password to reset old one</p> */}
                </div>
                <div className="relative w-full ">
                    <Input placeholder="new password" type="password" value={password} onChange={changeHandler} className="pl-10 focus-visible:ring-0"/>
                    <LockKeyholeIcon className="absolute inset-y-2 left-2 pointer-events-none text-gray-500 "/>
                </div>
                {
                    !loading ? <button className="bg-orange-500 rounded-md text-white font-semibold w-full p-2 hover:bg-orange-400">Reset  </button> :
                    <button disabled type="submit" className="bg-orange-400 rounded-md text-white font-semibold w-full p-2 flex flex-row justify-center gap-2 "><Loader2 className="text-white animate-spin text-xs"></Loader2>Please Wait</button>
                }
            </form>
            <p className="text-sm text-left">Back to <Link to="/login" className="text-blue-600 text-sm hover:underline">login</Link></p>
        </div>
    )
}

export default ResetPassword
