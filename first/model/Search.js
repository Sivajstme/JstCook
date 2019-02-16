import axios from "axios";

export default class Search{

    constructor(query){
        this.query = query;
    }

    async getResults() {
        const myKey = 'fa4317ffad37303bb3f9468d447cdfd7';
        const cros = 'https://cors-anywhere.herokuapp.com/';
        try{
            const res = await axios(`${cros}https://www.food2fork.com/api/search?key=${myKey}&q=${this.query}`);
            //console.log(res);
            this.data = res.data.recipes;
        //    console.log(this.data);
        } 
        catch(err){
            console.log(err);
        }


    }


}