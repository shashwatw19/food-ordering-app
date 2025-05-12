export type FilterOptions = {
    id : string ,
    label : string 
}
const filterOptionType : FilterOptions[]= [
    {id : "burger" , label : "Burger"},
    {id : "thali" , label : "Thali"},
    {id : "biryani" , label : "Biryani"},
    {id : "momos" , label : "Momos"},
    
]
const FilterPage = ()=>{
    const appliedFilter = (value : string )=>{
        alert(value)
    }
    return (
        <div className="md:w-72 ">
            <div className="flex flex-row items-center  justify-between ">
                <h1 className="font-medium text-lg">Filter by cuisines</h1>
                <button className="bg-gray-100 rounded-md py-1 px-2 text-gray-800 text-sm font-medium">Reset</button>
            </div>
            <div>
                {
                    filterOptionType?.map((option)=>{
                        return <div key={option.id} className="flex items-center space-x-2 my-2" >
                            <input onClick={()=>appliedFilter(option.label)} type="checkbox" id={option.id}/>
                            <label  className="text-gray-700 font-medium text-sm" htmlFor={option.id}>{option.label}</label>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default FilterPage