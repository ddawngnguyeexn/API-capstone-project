import {useState, useEffect, useContext} from "react";
import GetAPIServices from "../../services/GetAPIServices";
import Pagination from "../../components/Pagination";

function Houses () {
    const [houses, setHouses] = useState([]);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPages, setPostPerPages] = useState(30);

    

    
    useEffect(()=>{
        const getAPIServices = new GetAPIServices();
        const getHouses = async () =>
            {
            try
                {
                const res = await getAPIServices.getHouses(currentPage, postPerPages);
                console.log("print res 1",res);
                setHouses(res);
                }
            catch (error){
                console.log(error);
            }
            }
        getHouses();
        console.log("print houses 2",houses);
    },[currentPage, postPerPages]);
    function renderItems(arr,renderItem){
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li key={id}> {label}
                </li>
            );
        });
    }
    const items = renderItems(houses,({name})=>`${name}`);
    return (
        <>
        <ul>
            {items}
        </ul>
        <Pagination 
            totalPosts={houses.length}
            postPerPages={postPerPages}    
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
        </>
    )
}
export default Houses; 
