import { LoginInputState, SignupInputState } from "../schema/userSchema";

type User = {
fullname: string;
  email: string;
  password: string ;
  address: string;
  city: string;
  contact: number;
  avatarImage: string ;
  isAdmin : boolean;
}
export interface finalSignInState extends SignupInputState{
    otp : string
}
export type UserState = {

    formData : SignupInputState | null
    user : User | null,
    isAuthenticated : boolean,
    isCheckingAuth : boolean,
    loading : boolean,
    setFormData : (data : SignupInputState)=>void
    signup : (input : finalSignInState)=>Promise<boolean>,
    signin : (input : LoginInputState)=>Promise<boolean>,
    createOtp : (input : string )=>Promise<boolean>,
    logout : ()=>Promise<boolean>,
    forgotPassword : (input : string)=>Promise<boolean>,
    resetPassword : (token : string , newPassword : string)=>Promise<boolean>,
    updateProfile : (input : any)=>Promise<boolean>,
    checkAuth : ()=>Promise<void>
    updateAdminStatus : ()=>void
}