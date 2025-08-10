import { ChangeEvent, FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"
import { Input } from "../ui/input"
import { useRef } from "react"
import { useUserStore } from "../../store/useUserStore"
import { finalSignInState } from "../../types/userType"

interface VerificationEmailProps {
    onVerificationComplete: () => void
}
const VerifyEmail = ({ onVerificationComplete }: VerificationEmailProps) => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])

    const inputRef = useRef<any>([])
   
    const formData = useUserStore((state) => state.formData)
    const loading = useUserStore((state) => state.loading)
    const signup = useUserStore((state) => state.signup)
    const changehandler = (value: string, index: number) => {
        if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
        }
        if (value !== "" && index < 5) {
            inputRef.current[index + 1].focus()
        }
    }

    const onkeydownHandler = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Backspace' && !otp[index] && index > 0)
            inputRef.current[index - 1].focus()
    }
    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()

        const data: finalSignInState = {
            fullname: formData?.fullname ?? "",
            email: formData?.email ?? "",
            contact: formData?.contact ?? "",
            password: formData?.password ?? "",
            otp: otp.join('')
        }
        console.log(data)
        const response = await signup(data);
        try {
            if (response) {
                onVerificationComplete()
                
            }
        }
        catch (e) {
            console.log('error from verifyEmail', e)
        }
    }

    return (
    <div className="flex justify-center md:p-8 p-4 items-center w-screen h-screen">
        <div className="flex flex-col gap-5  items-center w-full max-w-md">
            <div className="flex flex-col items-center gap-2">
                <h2 className="text-black text-2xl font-bold">Verify Your Email</h2>
                <p className="text-sm text-gray-600 ">enter the 6 digit code sent to your email <span className="text-gray-800 underline">{formData?.email}</span></p>
            </div>
            <form onSubmit={submitHandler} className="flex flex-col gap-5">
                <div className="flex flex-row gap-3 justify-center">
                    {
                        otp?.map((digit: string, index: number) => {
                            return <Input disabled={loading} className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-semibold text-gray-600 focus:outline-none focus:ring-2 " type="text"
                                ref={(element) => { inputRef.current[index] = element }}
                                maxLength={1} value={digit} key={index}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => changehandler(e.target.value, index)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onkeydownHandler(index, e)} />
                        })
                    }
                </div>
                {
                    !loading ? <button type="submit" className="bg-orange-500 text-white font-semibold text-semibold rounded-md p-2 w-full">Verify</button> :
                        <button disabled className="text-white bg-orange-300 flex flex-row justify-center  gap-2 font-semibold p-2 w-full rounded-md"><Loader2 className="text-white animate-spin" />Please Wait</button>
                }
            </form>

        </div>




    </div>
)
}



export default VerifyEmail
