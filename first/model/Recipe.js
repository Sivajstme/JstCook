import  axios  from "axios";
import { config } from "../config"

export default class Recipe{
    constructor (id){
        this.id = id;
    }

    async getRecipe(){
        // https://www.food2fork.com/api/get?key=YOUR_API_KEY&rId=35382
        try{
            const fullRes = await axios(`${config.cros}https://www.food2fork.com/api/get?key=${config.myKey}&rId=${this.id}`)

            this.title = fullRes.data.recipe.title;
            this.publisher = fullRes.data.recipe.publisher;
            this.image = fullRes.data.recipe.image_url;
            this.ingredients = fullRes.data.recipe.ingredients;
        }catch(err){
            console.log(err);


        }
    }

    calcTime(){
        //Calculations are  not accurate taking 15Min for atleast 3 ingredients

        const numOfIngre = this.ingredients.length;
        const period = Math.ceil(numOfIngre/3);
        this.time = period * 15;
    }
    calServing(){
        this.calServing = 4;
    }
    /**
     * ingredients: [
    0: "4 Tablespoons Butter"
    1: "2 Tablespoons Olive Oil"
    2: "1/2 whole Medium Onion, Finely Diced"
    3: "4 cloves Garlic Cloves, Minced Or Pressed"
    4: "1 pound Large Shrimp, Peeled And Deveined"
    5: "1/2 cup White Wine"
    6: "2 whole Lemons"
    7: "4 dashes Hot Sauce (I Used Tabasco; More To Taste)"
    8: "Salt And Freshly Ground Black Pepper, To Taste"
    9: "8 ounces, weight Angel Hair Pasta"
    10: "Chopped Fresh Basil To Taste"
    11: "Chopped Fresh Parsley, To Taste"
    12: "1/2 cup Grated Parmesan Cheese"
                        ]
     */

    parseIngredients(){
        //Takeing Reference of all the units 
        const longUnits = ['tablespoon', 'tablespoons','ounce','ounces','teaspoon','teaspoons','cups','pound'];
        const shortUnits = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const newIngredents = this.ingredients.map(el=>{
            // 1) Uniform Units                 //Pound
            let ingredient = el.toLowerCase();  //pound index: 4
            longUnits.forEach((unit,i) =>{       
                ingredient =  ingredient.replace(unit,shortUnits[i]);
                
            });

            // 2) Remove Paranthesis


            //3) Parse ingredients into Count, Unit and ingredients
        })

        this.ingredients = newIngredents;
    }

}


