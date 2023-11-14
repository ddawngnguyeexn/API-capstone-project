import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import GetAPIServices from "../../services/GetAPIServices";
import Pagination from "../../components/Pagination";
// import axios from 'axios';


function Characters () {
    const [characters, setCharacters] = useState([]);
    // const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPages, setPostPerPages] = useState(50);

    // const lastPostIndex = currentPage * postPerPages; 
    // const firstPostIndex = lastPostIndex - postPerPages;  
    // const currentCharacters = characters.slice(firstPostIndex,lastPostIndex);
    // const getAPIServices = new GetAPIServices();
    
    useEffect(()=>{
        const getAPIServices = new GetAPIServices();
        const getCharacters = async () =>
            {
            try
                {
                const res = await getAPIServices.getCharacters(currentPage, postPerPages);
                // console.log("print 1",res);
                setCharacters(res);
                }
            catch (error){
                console.log(error);
            }
            }
        getCharacters();
        // console.log("print 2",characters);
    },[currentPage, postPerPages]);
    function findId(str) {
        // console.log(str);
        // const firstDigit = str.search(/\d/);
        // console.log(firstDigit);
        // console.log(str.length);
        // console.log(str.substring(firstDigit,str.length));
        return str.substring(str.search(/\d/),str.length);
    }
    function renderItems(arr,renderItem){
        return arr.map((item) => {
            // console.log(item.url);
            const id = findId(item.url);
            // console.log('findID: ',id);
            const itemDetails = renderItem(item);
            return (
                <li key={id} onClick={(event) =>handleClickOfCharacter(event,id)}> {itemDetails}
                </li>
            );
        });
    }
    const items = renderItems(characters,({name,gender,culture,father})=>
        `NAME ${name} GENDER ${gender} CULTURE ${culture} FATHER ${father}`);
    function handleClickOfCharacter (event, id)
    {
      console.log(event);
      navigate(`/character/${id}`);
    }
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
