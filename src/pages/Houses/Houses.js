import {useState, useEffect, useContext} from "react";
import GetAPIServices from "../../services/GetAPIServices";
import Pagination from "../../components/Pagination";
import {useNavigate } from "react-router-dom";

function Houses () {
    const [houses, setHouses] = useState([]);
    const [currentLord, setCurrentLord] = useState();
    const [currnetSwornMem, setCurrentSwornMem] = useState();
    

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPages, setPostPerPages] = useState(30);
    const navigate = useNavigate();
    

    
    useEffect(()=>{
        const getAPIServices = new GetAPIServices();
        const getHouses = async () =>
            {
            try
                {
                const res = await getAPIServices.getHouses(currentPage, postPerPages);
                console.log("print res 1",res);
                setHouses(res);
                // if(res.currentLord) 
                //     { 
                //     const houseCurrentLord = await handleCharName(res.currentLord);
                //     setCurrentLord(houseCurrentLord);
                //     console.log(houseCurrentLord;
                //     } 
                //     else {
                //       setCurrentLord("no data :(")
                //       console.log("no data");
                //     }
                //     if(res.swornMembers) 
                //     { 
                //     console.log(res.swornMembers);
                //     const houseSwornMemPromises = res.swornMembers.map(async (link) => {
                //       const swornMem = await handleAlligancesName(link);
                //       return swornMem;
                //     });
                //     const swornMems = await Promise.all(houseSwornMemPromises); 
                //     setCurrentSwornMem(swornMems);
                //     console.log(swornMems);
                //     } 
                //     else {
                //       setCurrentSwornMem("no data :(")
                //       console.log("no data");
                //     }
                    
                //   console.log("API Call finished!");
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
            const id = item.url.substring(item.url.search(/\d/),item.url.length);
            const label = renderItem(item);
            return (
                <li key={id}> {label}
                </li>
            );
        });
    }
    const handleCharName = async(url) =>{
        const getAPIServices = new GetAPIServices();
        try 
            {
              const res = await getAPIServices.getNameCharacterByUrl(url);
              console.log("getNameBy", res);
              return res;
            }
            catch(error){
              console.log(error);
            }
        };
    // const handleClickOfIcon = () => 
    //     {
    //     console.log('Current Lord Clicked', currentLord);
    //     //    console.log(event.target);
    //     //    const charId = event.target.substring(event.target.search(/\d/),event.target.length)
    //     //    console.log("char ID", charId);
    //     //    navigate(`/character/${charId}`);
    //     }
    const items = renderItems(houses,({name, titles, currentLord, swornMembers})=>{
        const handleClickOfIcon = () => 
        {
           console.log('Current Lord Clicked', currentLord);
           const charId = currentLord.substring(currentLord.search(/\d/),currentLord.length);
           console.log("char ID", charId);
           navigate(`/character/${charId}`);
        }
        const handleSwornMemberClick = (member) => {
            console.log('swornMember Clicked', member);
            const memID = member.substring(member.search(/\d/),member.length);
            console.log("memID", memID);
            navigate(`/character/${memID}`)

        }
        return (
        <div>
            <p>Name: {name}</p>
            <p>Titles: {titles}</p>
            <p onClick={handleClickOfIcon}>Current Lord: {currentLord}</p>
            {swornMembers && swornMembers.map((member, index) => (
             <p key={index} onClick={() => handleSwornMemberClick(member)}>
            SWORN MEMBER {index + 1}: {member}
            </p>
            ))}

            {swornMembers && swornMembers.length === 0 && (
            <p>No sworn members available.</p>
            )}
        </div>
        )
        });
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
