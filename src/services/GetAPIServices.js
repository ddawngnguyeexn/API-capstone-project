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
    async getHouses() {
        const res = await this.getResource("/houses/");
        return res.map(this.transformHouse)
    }
    async getCharacters(currentPage, postPerPages) {
        // const res = await this.getResource("/characters");
        const res = await this.getResource("/characters?page=1&pageSize=20");
        console.log('getCharacters: ', res);
        return res.map(this.transformCharacter);
    }
    async getCharacter(id){
        const character = await this.getResource(`/characters/${id}`);
        return this.transformCharacter(character)
    }
    transformCharacter(char, i) 
    {
        return {
          name: char.name || "no data :(",
          gender: char.gender || "no data :(",
          culture: char.culture || "no data :(",
          id: i + 41
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
          released: book.released,
          id: i + 1
        }
      }
}

export default GetAPIServices;