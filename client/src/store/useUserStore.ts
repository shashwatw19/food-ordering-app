import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { finalSignInState, UserState } from "../types/userType";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";
import axios from "axios";
import { User } from "../apis";
import { useCartStore } from "./useCartStore";
import { UpdateUserProfile } from "../types/updateUserProfile";
import { useRestaurantStore } from "./useRestaurantStore";
import { useOrderStore } from "./useOrderStore";
axios.defaults.withCredentials = true;
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      formData: null,
      isAuthenticated: false,
      isCheckingAuth: false,
      loading: false,
      setFormData: (data: SignupInputState) => {
        set({ formData: data });
      },
      createOtp: async (email: string) => {
        const toastId = toast.loading("loading...");
        try{
          set({loading : true});
          const response = await axios.post(User.CREATE_OTP , {email} , {
            headers : {
              'Content-Type' : 'application/json'
            }
          })

          if(!response.data.success){
            toast.error(response.data.message);
            return false
          }
          console.log(response.data)
          toast.success('email sent!')
          return true;
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.request?.data?.message || 'not able to sent email'
            toast.error(errorMessage);
            console.error("OTP ERROR :" , {
              message : errorMessage,
              statusCode : e.response?.status
            })
          }
          return false
        }finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
      },

      signup: async (input: finalSignInState) => {
        const toastId = toast.loading("loading...");
        try {
          set({ loading: true });
          const response = await axios.post(User.SIGNUP, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.data.success) {
            toast.error(response.data.message);
            return false;
          }

          toast.success("account verified! Please login to continue...");
          return true;
        } catch (error) {
          // Handle network errors or other Axios errors
          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.message || "Signup failed";
            toast.error(errorMessage);
            console.error("Signup Error:", {
              message: errorMessage,
              statusCode: error.response?.status,
            });
          } 
          return false;
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },
      signin: async (input: LoginInputState) => {
        const toastId = toast.loading("loading...");
        try {
          set({ loading: true });
          const response = await axios.post(
            User.SIGNIN,
             input ,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
         
          console.log(response.data);
          set({user : response.data.data})
          set({isAuthenticated : true})
          
          toast.success("Login Success");
          return response.data.success;
        } catch (e: any) {
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || 'Login failed!'
            toast.error(errorMessage)
            console.error("Login Error : " , {
              message : errorMessage,
              statusCode : e.response?.status
            })
            return false
          }
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },
      forgotPassword: async (email: string) => {
        const toastId = toast.loading("loading...");
        try {
          set({ loading: true });
          const response = await axios.post(
            User.SIGNUP,
            { email },
            {
              headers: {
                "Content-Type": "application-json",
              },
            }
          );
          if (!response?.data.success) {
            throw new Error(response.data);
          }
          toast.success("email sent!");
          return response.data.success;
        } catch (e: any) {
          toast.error(e.message);
          console.log(e);
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        const toastId = toast.loading("loading...");
        try {
          set({ loading: true });
          const response = await axios.post(
            User.SIGNUP,
            { token, newPassword },
            {
              headers: {
                "Content-Type": "application-json",
              },
            }
          );
          if (!response?.data.success) {
            throw new Error(response.data);
          }
          toast.success("password changed!");
          return response.data.success;
        } catch (e: any) {
          toast.error(e.message);
          console.log(e);
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },
      updateProfile: async (input: UpdateUserProfile) => {
          const toastId = toast.loading("Updating...")
          try{
            set({loading : true})
            const response = await axios.put(User.UPDATE_PROFILE , input , {
              headers : {
                'Content-Type' : 'multipart/form-data'
              }
            } )

            console.log("response from update Profile" , response.data)
            toast.success('Profile Updated!')
   
            set({user : response?.data.data.updatedUser })
            return true
          }catch(e){
            if(axios.isAxiosError(e)){
              const errorMessage = e.response?.data.message || "SOMETHING WENT WRONG"
              toast.error(errorMessage)
              console.error({
                error : e,
                message : errorMessage
              })
            }
            return false
          }finally{
            set({loading : false})
            toast.dismiss(toastId)
          }
      },
      logout: async () => {
        try{
          set({loading : true})
          const response =  await axios.post(User.LOG_OUT , {} )
          set({user : null})
          set({isAuthenticated : false})
          useCartStore.getState().resetCart()
          useCartStore.setState({restaurantId : null})
          useRestaurantStore.getState().setRestaurantNull()
          useOrderStore.getState().setOrderData()
          console.log("response from logout " , response)
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || 'FAILED TO LOGOUT'
            toast.error(errorMessage)
            console.error({
              message : errorMessage,
              error : e
            })
          }
          return false
        }finally{
          set({loading : false})
        } 
      },
      checkAuth : async()=>{
        try{
          const response = await axios.get(User.CHECK_AUTH)
          console.log("response from checkAuth " , response)
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "AUTHENTICATION FAILED"
            console.error({
              error : e,
              message : errorMessage
            })

          }
          set({user : null})
          set({isAuthenticated : false})
          useCartStore.getState().resetCart()
        }
      },
     updateAdminStatus : ()=>{
      set((state) => {
      if (!state.user) return state; // Do nothing if user is null

      return {
      user: {
        ...state.user,
        isAdmin: true,
        },
      };
  });

     }
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useUserStore };
