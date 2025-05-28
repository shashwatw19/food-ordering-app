import { MenuItem } from "./restaurantType"

export type menuState = {
    loading : boolean,
    restaurantMenu : MenuItem | null,
    addMenu : (data : FormData)=>Promise<Boolean>
    updateMenu : (data : FormData)=>Promise<Boolean>
}