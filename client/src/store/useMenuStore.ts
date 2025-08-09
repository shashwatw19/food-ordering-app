import {create } from 'zustand'
import { menuState } from '../types/menuTypes'
import { persist } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'

import { toast } from 'sonner'
import axios from 'axios'
import { Restaurants } from '../apis'
import { useRestaurantStore } from './useRestaurantStore'
axios.defaults.withCredentials = true;
const useMenuStore = create<menuState>()(
    persist((set )=>({
    loading : false,
    restaurantMenu : null,
    addMenu : async(menu : FormData)=>{
        const toastId = toast.loading('Adding Menu...')
        try{
          set({loading : true})
          const response = await axios.post(Restaurants.ADD_MENU , menu , {
            headers : {
              'Content-Type' : 'multipart/form-data'
            }
          })
          console.log("response from addMenu" , response.data.data.menu);
          useRestaurantStore.getState().addMenuToRestaurant(response.data.data.menu)
          toast.success(response.data.message)
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Some Error Occured"
            toast.error(errorMessage)
            console.log("error from addMenuToRestaurant" , e)
          }
          return false
        }finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
    },
    updateMenu : async( menu : FormData)=>{
         const toastId = toast.loading('updating Menu...')
        try{
          set({loading : true})
          const response = await axios.put(Restaurants.UPDATE_MENU , menu , {
            headers : {
              'Content-Type' : 'multipart/form-data'
            }
          })
          console.log("response from updateMenu" , response.data.data.menu);
          useRestaurantStore.getState().updateMenuForRestaurant(response.data.data.menu)
          toast.success(response.data.message)
          return true
        }catch(e){
          if(axios.isAxiosError(e)){
            const errorMessage = e.response?.data?.message || "Some Error Occured"
            toast.error(errorMessage)
            console.log("error from updateMenu" , e)
          }
          return false
        }finally{
          set({loading : false})
          toast.dismiss(toastId)
        }
    }
   }
), {
    name: "menu-name", storage: createJSONStorage(() => localStorage) 
}))


export {useMenuStore}