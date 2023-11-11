import {useState, useEffect, useContext} from "react";

import GetAPIServices from "../../services/GetAPIServices";
import Pagination from "../../components/Pagination";
// import axios from 'axios';


function Characters () {
    const [characters, setCharacters] = useState([]);
    // const [pageNumber, setPageNumber] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPages, setPostPerPages] = useState(30);

    // const lastPostIndex = currentPage * postPerPages; 
    // const firstPostIndex = lastPostIndex - postPerPages;  
    // const currentCharacters = characters.slice(firstPostIndex,lastPostIndex);

    
    useEffect(()=>{
        const getAPIServices = new GetAPIServices();
        const getCharacters = async () =>
            {
            try
                {
                const res = await getAPIServices.getCharacters(currentPage, postPerPages);
                console.log("print 1",res);
                setCharacters(res);
                }
            catch (error){
                console.log(error);
            }
            }
        getCharacters();
        console.log("print 2",characters);
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
    const items = renderItems(characters,({name,gender,culture})=>`${name} ${culture}(${gender})`);
    return (
        // <div>
        //     {
        //         characters.map(
        //             (char)=> <div>{char}</div>
        //         )
        //     }
        // </div>
        <>
        <ul>
            {items}
        </ul>
        <Pagination 
            totalPosts={characters.length}
            postPerPages={postPerPages}    
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
        </>
    )
}
export default Characters; 
