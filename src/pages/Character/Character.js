import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import GetAPIServices from "../../services/GetAPIServices";

function Character () 
{
    const [character, setCharacter] = useState();
    const [charFar, setCharFar] = useState();
    const {id}= useParams();
    // const {enableLoading, disableLoading} = useContext(LoadingContext);
    const [currentId, setCurrentId] = useState(id);
    console.log({id});
    console.log(id);
    useEffect(() =>
              {
                const getAPIServices = new GetAPIServices();
                const getCharacter = async () =>
                {
                  try
                  {
                    const res = await getAPIServices.getCharacter(currentId);
                    console.log("print char API",res);
                    setCharacter(res);
                    console.log(res.father);
                    console.log("character after res",character);
                    if(res.father) 
                    { 
                    const charFar = await handleParentsName(res.father);
                    setCharFar(charFar);
                    console.log(charFar);
                    } 
                    else {
                      setCharFar("no data :(")
                      console.log("no data");
                    }
                    
                  console.log("API Call finished!");
                  }
                  catch (error){
                    console.log(error);
                }  
                }
                getCharacter();
                console.log("print current char",character);
              },
              [currentId]
    );
    const handleParentsName = async(url) =>{
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
    const prevChar = () => setCurrentId(prev => prev -1);
    const nextChar = () => setCurrentId(prev => prev +1);
    // console.log("test character", character);
    // console.log("father link", character.father);
   
    return (
        character
        &&
        <>
        <div>
        URL: {character.url}
        NAME:{character.name} CULTURE: {character.culture} GENDER: ({character.gender})
        BORN: {character.born} DIED: {character.died} TITLE: {character.titles} 
        FATHER: {charFar}
        {/* FATHER: {character.father? handleParentsName(character.father) : "no data :("} */}
        </div>
        <button onClick={prevChar} disabled={currentId === 1}>Prev Character</button>
        <button onClick={nextChar} disabled={currentId === 2138}>Next Character</button>
        </>
    );
}
export default Character; 
// disabled={!totalPosts}