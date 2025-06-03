import { MenuItem } from "./restaurantType";

export interface CartItem extends MenuItem {
    quantity : number
}

export type cartType = {
    cart : CartItem [] ,
    addToCart : (item : MenuItem , restaurant_id : string)=>boolean 
    removeFromCart : (_id : string)=>void
    incrementItem : (_id : string)=>void
    decrementItem : (_iod :string)=>void
    resetCart : ()=>void,
    setRestaurantId : (_id : string)=>void,
    restaurantId :  string | null,
  
  
    findItemInCart : (itme : CartItem)=>boolean
}