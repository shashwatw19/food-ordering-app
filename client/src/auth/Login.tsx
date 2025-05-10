import { Mail } from "lucide-react";
import { LockKeyhole, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState , userLoginSchema } from "../schema/userSchema";
 
const Login = () => {
    const [input , setInput] = useState<LoginInputState>({
        email: "",
        password: "",
    })

    // error generated will be one of the type in logininput state therefore using partial is a better choice
    const [errors , setErrors] = useState<Partial<LoginInputState>>({})

    const changeHandler = (e : ChangeEvent<HTMLInputElement>)=>{
        const{name , value} = e.target;
        setInput({...input , [name] : value});
    }
    const submitHandler = async(e : FormEvent)=>{
        e.preventDefault();
        const result = userLoginSchema.safeParse(input);

        if(!result.success){
            const fieldError = result.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<LoginInputState>)
            return ;
        }
        
        setErrors({
            email : "",
            password : ""
        })
    
        // login api started here
        console.log(result);
    }
    const loading = 0
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <form onSubmit={submitHandler} className="md:p-8 w-full max-w-md  border-gray-200 rounded-lg  flex flex-col gap-2">
                <h1 className="text-center font-bold">APP NAME</h1>
                <div className="relative">
                    <Input placeholder="Email" onChange={changeHandler} type="email" name="email" value={input.email} className="pl-10 focus-visible:ring-0" />
                    <Mail className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                { errors && <span className="text-sm text-red-500 ">{errors.email}</span> }

                <div className="relative">
                    <Input placeholder="Password" onChange={changeHandler} name="password" value={input.password} type="password" className="pl-10 focus-visible:ring-0" />
                    <LockKeyhole className="absolute inset-y-2 left-2 pointer-events-none text-gray-500" />
                </div>

                { errors && <span className="text-sm text-red-500 ">{errors.password}</span> }

                {loading ? <Button disabled className="bg-orange-500 hover:bg-orange-400 duration-100 transition-all  w-full my-5 "><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait..</Button> : 
                
                <Button type='submit'className="bg-orange-500 hover:bg-orange-400 w-full my-5 " >Login</Button>}
                
                <Link to={"/forgot-password"} className="text-blue-800 text-xs text-left -mt-3 ">Forgot-Password?</Link>
                
                <div className="mt-2 h-[1px] w-full bg-gray-400"></div>
                    
                <div className="mx-auto -mt-1">
                    <p className="text-gray-800">Don't have an account? <Link to={"/signup"} className="text-blue-800">Signup</Link></p>
                </div>
                
            </form>
        </div>
    )
}
export default Login;