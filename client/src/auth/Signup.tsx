import {  Mail, Phone, User } from "lucide-react";
import { LockKeyhole, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { SignupInputState , userSignupSchema } from "../schema/userSchema";
const Signup = () => {
    const [input , setInput] = useState<SignupInputState>({
        email: "",
        password: "",
        fullname : "",
        contact : ""
    })
    const [error , setError] = useState<Partial<SignupInputState>>({})

    const changeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
        const{name , value} = e.target
        setInput({...input , [name] : value})
    }
    const submitHandler = (e : FormEvent)=>{
        e.preventDefault()
        const result = userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldError = result.error.formErrors.fieldErrors
            setError(fieldError as Partial<SignupInputState>)
            return ;
        }
        
        setError({
          email: "",
          password: "",
          fullname : "",
          contact : ""
        })

        console.log(result)


    }
    const loading = 0
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <form onSubmit={submitHandler} className="md:p-8 w-full max-w-md   border-gray-800 rounded-lg  flex flex-col gap-2">
                <h1 className="text-center font-bold">APP NAME</h1>
                <div className="relative">
                    <Input placeholder="Name" onChange={changeHandler} type="text" name="fullname" value={input.fullname} className="pl-10 focus-visible:ring-0" />
                    <User className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                {error && <span className="text-sm text-red-500">{error.fullname}</span>}

                <div className="relative">
                    <Input placeholder="Contact No." onChange={changeHandler} type="text" name="contact" value={input.contact} className="pl-10 focus-visible:ring-0" />
                    <Phone className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                {error && <span className="text-sm text-red-500">{error.contact}</span>}

                <div className="relative">
                    <Input placeholder="Email" onChange={changeHandler} type="email" name="email" value={input.email} className="pl-10 focus-visible:ring-0" />
                    <Mail className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                {error && <span className="text-sm text-red-500">{error.email}</span>}

                <div className="relative">
                    <Input placeholder="Password" onChange={changeHandler} name="password" value={input.password} type="password" className="pl-10 focus-visible:ring-0" />
                    <LockKeyhole className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                {error && <span className="text-sm text-red-500">{error.password}</span>}

                {loading ? <Button disabled className="bg-orange-500 hover:bg-orange-400 duration-100 transition-all  w-full my-5 "><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait..</Button> : 
                <Button type='submit'className="bg-orange-500 hover:bg-orange-400 w-full my-5 " >Login</Button>}

                <div className="mt-2 h-[1px] w-full bg-gray-400"></div>

                <div className="mx-auto -mt-1">
                    <p className="text-gray-800">Already have an account? <Link to={"/login"} className="text-blue-800">Login</Link></p>
                </div>
            </form>
        </div>
    )
}
export default Signup;