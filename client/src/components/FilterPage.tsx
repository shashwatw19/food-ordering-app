import { useRestaurantStore } from "../store/useRestaurantStore"

export type FilterOptions = {
    id : string ,
    label : string 
}
const filterOptionType : FilterOptions[]= [
   
    {id : "chinese" , label : "Chinese"},
    {id : "continental" , label : "Continental"},
    {id : "dessert" , label : "Dessert"},
    
    {id : "italian" , label : "Italian"},
    {id : "mexican" , label : "Mexican"},
    {id : "momos" , label : "Momos"},
    {id : "north-indian" , label : "North Indian"},
   
   
    {id : "south-indian" , label : "South Indian"},
    
    
]

const FilterPage = ()=>{
    const setAppliedFilter = useRestaurantStore((state=>state.setAppliedFilter))
    const resetAppliedFilter = useRestaurantStore((state)=>state.resetAppliedFilter)
    const appliedFilter = useRestaurantStore((state)=>state.appliedFilter)
    
    const handleAppliedFilter = (value : string )=>{
        setAppliedFilter(value)
    }
   
    return (
        <div className="md:w-72 ">
            <div className="flex flex-row items-center  justify-between ">
                <h1 className="font-medium text-lg">Filter by cuisines</h1>
                <button onClick={resetAppliedFilter} className="bg-gray-100 rounded-md py-1 px-2 text-gray-800 text-sm font-medium">Reset</button>
            </div>
            <div className="flex md:flex-col md:gap-0 md:mt-0 mt-2 flex-row gap-3 flex-wrap">
                {
                    filterOptionType?.map((option)=>{
                        return <div key={option.id} className="flex items-center space-x-2 my-2 flex-wrap" >
                            <input onChange={()=>handleAppliedFilter(option.label)} type="checkbox" checked={appliedFilter.includes(option.label)} id={option.id}/>
                            <label  className="text-gray-700 font-medium text-sm" htmlFor={option.id}>{option.label}</label>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default FilterPage
