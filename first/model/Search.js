import axios from "axios";
import { config } from "../config";
export default class Search{

    constructor(query){
        this.query = query;
    }

    async getResults() {

        try{

            const res = await axios(`${config.cros}https://www.food2fork.com/api/search?key=${config.myKey}&q=${this.query}`);
            //console.log(res);
            this.data = res.data.recipes;
            console.log(this.data);
        } 
        catch(err){
            console.log(err);
        }


    }


}