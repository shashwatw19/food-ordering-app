import { create } from "zustand";
import { OrderState } from "../types/orderType";
import { createJSONStorage } from "zustand/middleware";
import { persist } from "zustand/middleware";
import { CheckoutSessionRequest } from "../types/orderType";
import { ORDERS, PAYMENTS } from "../apis";
import axios from "axios";
import { toast } from "sonner";
import { VerifyPayment } from "../types/orderType";
import { useCartStore } from "./useCartStore";


axios.defaults.withCredentials = true;
const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      order: [],
      //this will load the razoyPay sdk script
      loadScript: (src: string) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      },
      capturePayment: async (
        checkoutSessionRequest: CheckoutSessionRequest
      ) => {
        const toastId = toast.loading("loading..");
        try {
          set({ loading: true });
          const response = await axios.post(
            PAYMENTS.CAPTURE_PAYMENT,
            checkoutSessionRequest,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response from capture payment ", response);
          return response;
        } catch (e) {
          if (axios.isAxiosError(e)) {
            const errorMessage =
              e.response?.data.message || "FAILED TO CAPTURE PAYMENT...";
            toast.error(errorMessage);
            console.error({
              error: e,
              message: errorMessage,
              status: e.status,
            });
          }
          return false;
        } finally {
          set({ loading: false });
          toast.dismiss(toastId);
        }
      },
      verifyPayment: async (input: VerifyPayment , navigate) => {
        const toastId = toast.loading("Verifying Payment...");
        try {
          const response = await axios.post(PAYMENTS.VERIFY_PAYMENT, input, {
            headers: {
              "Content-type": "application/json",
            },
          });
          console.log("response from verify Payments", response);
          set((state)=>{
            return {
              order : [...state.order , response?.data?.data]
            }
          })
          useCartStore.getState().resetCart();
          toast.success("Payment Verified!!");
         
          navigate("/order/success");
        } catch (e) {
          console.error("error from verifyPayments", e);
        } finally {
          toast.dismiss(toastId);
        }
      },
      sendSuccessMail: async (input: CheckoutSessionRequest) => {
        try {
          await axios.post(
            PAYMENTS.SEND_ORDER_SUCCESS_MAIL,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          
          toast.success(
            "We've sent a confirmation email with your order details."
          );
          return true;
        } catch (e) {
          console.log("error from sent success mail ", e);
          return false;
        }
      },
      findOrderForRestaurant: async () => {
        const toastId = toast.loading('loading...')
        set({loading : true})
        try{
          const response = await axios.get(ORDERS.FIND_ORDERS)
          console.log("response from findOrdersForRestaurant..." , response.data.data)
          // updating orders....
         set({order : response.data.data})
          toast.success('Orders found..')
          return false
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "FAILED TO FIND ORDERS"
            toast.error(errorMessage)
            console.error({
              error : e
            })
          }
          return false
        }finally{
          toast.dismiss(toastId)
          set({loading : false})
        }
        
      },
      updateStatus : async( input : {order_id : string , status : string})=>{
          const toastId = toast.loading('updating...')
          set({loading : true})
          try{
            const response = await axios.put(ORDERS.STATUS , input , {
              headers : {
                'Content-Type' : 'application/json'
              }
            })
            console.log("response from update Status" , response)
            toast.success('status update')
            return true
          }catch(e){
            if(axios.isAxiosError(e)){
              const errorMessage = e.response?.data.message || "FAILED TO UPDATE ORDER STATUS"
              toast.error(errorMessage)
              console.error({
                error : e
              })
            }
            return false
          }finally{
            set({loading : false})
            toast.dismiss(toastId)
          }
      },
      getAllOrdersForRestaurant : async()=>{
        return false
      },
      setOrderData : ()=>{
        set({order : []})
      },
      getPendingOrders : async()=>{
        const toastId = toast.loading('loading....')
        set({loading : true})
        try{
          const response = await axios.get(ORDERS.PENDING_ORDER)
          console.log("response from getPending orders" , response)
          set({order : response.data.data})
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "Something went wrong..!"
            toast.error(errorMessage)
            console.error({
              error : e
            })
          }
          return false
        }finally{
          toast.dismiss(toastId)
          set({loading : false})
        }
      },
      getOrdersForUser : async()=>{
        const toastId = toast.loading('loading...')
        try{
          const response = await axios.get(ORDERS.DELIVERED_ORDERS)
          toast.success('orders found!')
          console.log("response from delivered orders " , response)
          set({order : response.data.data})
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "FAILED TO GET ORDER"
            toast.error(errorMessage)
            console.error({
              error : e,
              message : errorMessage
            })
          }
           return false
        }
        finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
       
      }
    }),
    {
      name: "user-order",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useOrderStore };
