import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import GetAPIServices from "../../services/GetAPIServices";

function Character () 
{
    const [character, setCharacter] = useState();
    const {id}= useParams();
    // const {enableLoading, disableLoading} = useContext(LoadingContext);
  
    useEffect(() =>
              {
                const getAPIServices = new GetAPIServices();
                const getCharacter = async () =>
                {
                  try
                  {
                    const res = await getAPIServices.getCharacter({id});
                    console.log("print char API",res);
                    setCharacter(res);
                  }
                  catch (error){
                    console.log(error);
                }  
                }
                getCharacter();
                console.log("print current char",character);
              },
              []
    );

    return (
        character
        &&
        <>
        <div>
        URL: {character.url}
        NAME:{character.name} CULTURE: {character.culture} GENDER: ({character.gender})
        BORN: {character.born} DIED: {character.died} TITLE: {character.titles} FATHER: {character.father}
        </div>
        </>
    );
}
export default Character; 