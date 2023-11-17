import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import GetAPIServices from "../../services/GetAPIServices";

function Character () 
{
    const [character, setCharacter] = useState();
    const [charFar, setCharFar] = useState();
    const [charMo, setCharMo] = useState();
    const [charSpou, setCharSpou] = useState();
    const [charAlle, setCharAlles] = useState([]);
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
                    const charFar = await handleRelativesName(res.father);
                    setCharFar(charFar);
                    console.log(charFar);
                    } 
                    else {
                      setCharFar("no data :(")
                      console.log("no data");
                    }
                    if(res.mother) 
                    { 
                    const charMo = await handleRelativesName(res.mother);
                    setCharFar(charMo);
                    console.log(charMo);
                    } 
                    else {
                      setCharMo("no data :(")
                      console.log("no data");
                    }
                    if(res.spouse) 
                    { 
                    const charSpou = await handleRelativesName(res.spouse);
                    setCharSpou(charSpou);
                    console.log(charSpou);
                    } 
                    else {
                      setCharSpou("no data :(")
                      console.log("no data");
                    }
                    if(res.allegiances) 
                    { 
                    console.log(res.allegiances);
                    const charAllePromises = res.allegiances.map(async (link) => {
                      const houseName = await handleAlligancesName(link);
                      return houseName;
                    });
                    const charAlle = await Promise.all(charAllePromises); 
                    setCharAlles(charAlle);
                    console.log(charAlle);
                    } 
                    else {
                      setCharAlles(["no data :("])
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
    const handleRelativesName = async(url) =>{
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
    const handleAlligancesName = async(url) =>{
        const getAPIServices = new GetAPIServices();
        try 
            {
              const res = await getAPIServices.getNameHouseByUrl(url);
              console.log("getHouseName", res);
              return res;
            }
            catch(error){
              console.log(error);
            }
        };  
    const prevChar = () => setCurrentId(prev => Number(prev) -1);
    const nextChar = () => setCurrentId(prev => Number(prev) +1);
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
        MOTHER: {charMo}
        SPOUSE: {charSpou}
        {charAlle && charAlle.map((alle,index)=> (
          <p key = {index}> Allegiance {index+1}: {alle}</p>
        ))}
        {charAlle && charAlle.length === 0 && (
          <p>No Allegiance</p>
        )}
        {/* FATHER: {character.father? handleParentsName(character.father) : "no data :("} */}
        </div>
        <button onClick={prevChar} disabled={currentId === 1}>Prev Character</button>
        <button onClick={nextChar} disabled={currentId === 2138}>Next Character</button>
        </>
    );
}
export default Character; 
// disabled={!totalPosts}