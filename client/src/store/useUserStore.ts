import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { finalSignInState, UserState } from "../types/userType";
import { LoginInputState, SignupInputState } from "../schema/userSchema";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { User } from "../apis";
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
          if (!response?.data.success) {
            toast.error(response.data.message)
            return false
          }
          console.log(response.data);
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
      updateProfile: async (input: any) => {
        return false;
      },
      logout: async () => {
        return false;
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useUserStore };
