import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({options}){
    const [searchParams , setSearchparams ] = useSearchParams();
    const currSort = searchParams.get("sortBy") ||options[0].value;

    function handleChange(e){
       searchParams.set("sortBy" , e.target.value);
       setSearchparams(searchParams)
    }

   return(
        <Select options={options} type="white" onChange={handleChange} value={currSort} />
   );
}

export default SortBy;
