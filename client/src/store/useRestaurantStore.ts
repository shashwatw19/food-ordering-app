import { create } from "zustand";
import { RestaurantState } from "../types/restaurantType";
import { createJSONStorage, persist } from "zustand/middleware";
import { MenuItem } from "../types/restaurantType";
import { toast } from "sonner";
import axios from "axios";
import {Restaurants} from '../apis'
import { useUserStore } from "./useUserStore";


axios.defaults.withCredentials = true;
const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant: null,
      restaurantOrder: [],
      createRestaurant: async (formData: FormData) => {
        const toastId = toast.loading('loading...')
        set({loading : true})
        try{
          const response = await axios.post(Restaurants.CREATE , formData, {
            headers : {
              'Content-Type': 'multipart/form-data'
            }
          })
          console.log("response from createRestaurant " , response)
          if(!response.data.success){
            console.log(response.data.message)
            toast.error(response.data.message)

            return false
          }
          toast.success('Your Restaurant Has Been Successfull Added!')
          set({restaurant : response.data.data})
          useUserStore.getState().updateAdminStatus()
          return true;
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Not able to add restaurant"
            toast.error(errorMessage)
            console.error(e)
          }
          return false
        }finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
      },
      getRestaurant: async () => {
       
        try{
          const response = await axios.get(Restaurants.GET_RESTAURANT)
          // console.log("response from get API" , response)
          if(response.data.message == 'no restaurant found'){
            toast.error('not able to found restaurant!')
            set({restaurant : null})
            return false
          }
          // toast.success('restaurant found')
          console.log(response.data.data)
          set({restaurant : response.data.data})
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || ""
            toast.error(errorMessage)
            console.log({message : e.message })
          }
          return false
        }finally{
          set({loading : false})
          
        }
      },
      updateRestaurant: async (formData: FormData) => {
       const toastId = toast.loading('loading...')
        set({loading : true})
        try{
          const response = await axios.put(Restaurants.UPDATE , formData , {
            headers : {
              'Content-Type' : 'multipart/form-data'
            }
          })
          if(!response.data.success){
            toast.error(response.data.message)
            return false
          }
          toast.success('Your Restaurant Has Been Successfull Updated!')
          console.log(response)
          set({restaurant : response.data.data})
          return true;
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Not able to add restaurant"
            toast.error(errorMessage)
            console.log("Error from updateRestaurant " , e)
          }
          return false
        }finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
      },
      // search restaurant with filters
      searchRestaurant: async (searchText: string,searchQuery: string,selectedCuisines: any)=>{
        
        try{
            
            set({loading : true});
            const params = new URLSearchParams();
            params.set("searchQuery" , searchQuery)
            params.set("selectedCuisines" , selectedCuisines.join(","))
            
            const response = await axios.get(`${Restaurants.SEARCH}/${searchText}?${params.toString()}`)
            // toast.success(response.data.message)
            console.log("response from search restaurants " , response.data.data)
            set({searchedRestaurant : response.data.data})
            return true
        }catch(e){
            if(axios.isAxiosError(e)){
                const errorMessage = e.response?.data?.message || 'Search failed';
                toast.error(errorMessage)
                console.error("error from searchRestaurant" , e)
            }
            return false
        }finally{
            set({loading : false})
           
        }
 
      },
      getRestaurantMenu : async()=>{
          // const toastId = toast.loading('success')
          try{
            const response = await axios.get(Restaurants.GET_MENU)
            console.log("response from get Menu  " ,response)
            // toast.success(response.data.message)
            const menu = response.data.data.menu
            set(state => ({
              restaurant: state.restaurant ? { ...state.restaurant, menu: menu } : null,
            }));
            return true
          }catch(e){
            if(axios.isAxiosError(e)){
              const errorMessage = e.response?.data?.message || "Menu not available!"
              toast.error(errorMessage)
              console.log("Error from getRestaurantMenu " , e)
            }
            return false
          }finally{
            set({loading : false})
            // toast.dismiss(toastId)
          }
          
      },
      addMenuToRestaurant: async (item: MenuItem) => {
        set((state)=>({
          restaurant : state.restaurant ? {...state.restaurant , menu : [...state.restaurant.menu , item]} : null
        }))
      },
      updateMenuForRestaurant: async (updatedItem: MenuItem) => {
        set((state)=>{
          if(state.restaurant){
            const updateMenu = state.restaurant.menu.map((item)=> item._id === updatedItem._id ? updatedItem : item)
            return {
              restaurant : {
                ...state.restaurant , menu : updateMenu
              }
            }
          }
          return state;
        })
      },
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAlreadyApplied = state.appliedFilter.includes(value);
          const updatedFilter = isAlreadyApplied
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter: () => {
        set((state)=>{
            const resetFilter = state.appliedFilter = []
            return {appliedFilter : resetFilter}
        })
      },
      
      getSingleRestaurant: async (restaurantId: string) => {
     
        try{
          set({loading : true})
          const response = await axios.get(`${Restaurants.GET_RESTAURANT}/${restaurantId}`)
          console.log("resposne from get SingleRestaurant" , response)
          
          set({restaurant : response.data.data})
          
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data.message || "failed to search restaurant"
            toast.error(errorMessage)
            console.error({error : e.message , statusCode : e.status})
          }
        
        }finally{
         
          set({loading : false})
        
      
        }
      },
       
      setRestaurantNull : ()=>{
        set({restaurant : null})
      }
      
     
    }),
    { name: "restaurant-name", storage: createJSONStorage(() => localStorage) }
  )
);

export {useRestaurantStore}