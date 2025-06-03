import {Orders} from '../types/orderType'

export type MenuItem = {
    
    name : string,
    description : string,
    price: Number ,
    imageUrl: string,
    _id : string,
}

export type Restaurant = {
    _id : string,
    user : string,
    restaurantName : string,
    city: string,
    country : string,
    deliveryTime : number,
    cuisines : string[],
    menu : MenuItem[],
    imageUrl : string,
    address : string
}

export type SearchedRestaurant = {
    data : Restaurant[]
}

export type RestaurantState = {
    loading : boolean,
    restaurant : Restaurant | null,
    searchedRestaurant : Restaurant[] | null,
    appliedFilter : string[],
    singleRestaurant : Restaurant | null,
    restaurantOrder : Orders[],
    createRestaurant : (formData : FormData) => Promise<boolean>,
    getRestaurant : ()=>Promise<boolean>,
    updateRestaurant: (formData: FormData) => Promise<boolean>,
    searchRestaurant: (searchText: string, searchQuery: string, selectedCuisines: any) => Promise<boolean>,
    getRestaurantMenu : ()=>Promise<boolean>,
    addMenuToRestaurant: (menu: MenuItem) => void,
    updateMenuForRestaurant: (menu: MenuItem) => void,
    setAppliedFilter: (value:string) => void;
    resetAppliedFilter: () => void,
    getSingleRestaurant: (restaurantId:string) => Promise<void>,
    setRestaurantNull : ()=>void
}