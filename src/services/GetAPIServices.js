class GetAPIServices
{    
    constructor(){
        this.baseAPI = "https://www.anapioficeandfire.com/api";
    }
    async getResource (url)
    {
        
        const res = await fetch(`${this.baseAPI}${url}`);
        if (!res){
            throw new Error(`no ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    async getHouses(currentPage, postPerPages) {
        const res = await this.getResource(`/houses?page=${currentPage}&pageSize=${postPerPages}`);
        console.log('getHouses: ',res);
        return res.map(this.transformHouse)
    }
    async getCharacters(currentPage, postPerPages) {
        // const res = await this.getResource("/characters");
        const res = await this.getResource(`/characters?page=${currentPage}&pageSize=${postPerPages}`);
        console.log('getCharacters: ', res);
        return res.map(this.transformCharacter);
    }
    async getCharacter({id}){
        const character = await this.getResource(`/characters/${id}`);
        return this.transformCharacter(character)
    }
    async getNameCharacterByUrl(url){
       const id = url.substring(url.search(/\d/),url.length);
       console.log(id);
       const character = await this.getCharacter(id);
       return character.name; 
    }
    transformCharacter(char, getNameCharacterByUrl, i) 
    {
        return {
          name: char.name ? char.name : char.aliases,
          gender: (char.gender === "male"? "♂️":"♀️")|| "no data :(",
          culture: char.culture || "no data :(",
          url: char.url,
          born: char.born || "no data :(",
          died: char.died || "no data :(",
          titles: char.titles || "no data :(",
          father: char.father ? "function to get name" : "no data :("
          // father: char.father ==="" ? "no data :(" : getNameCharacterByUrl(char.father)
        };
    }
    transformHouse(house, i) {
        return {
          name: house.name,
          region: house.region,
          words: house.words,
          titles: house.titles,
          ancestralWeapons: house.ancestralWeapons,
          id: i + 1
        }
      }
    
    transformBook(book, i) {
        return {
          name: book.name,
          numberOfPages: book.numberOfPages,
          publisher: book.publisher,
          released: book.released
        }
      }
}

export default GetAPIServices;