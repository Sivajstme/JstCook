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
            this.url = fullRes.data.recipe.source_url;
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

    /** Sample Data
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
    Example take 46943
                        */

    parseIngredients(){
        //Takeing Reference of all the units 
        const longUnits = ['tablespoons', 'tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pound'];
        const shortUnits = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units = [...shortUnits,'kg','g'];

        const newIngredents = this.ingredients.map(el=>{
            // 1) Uniform Units                 //4 Tablespoons Butter
            let ingredient = el.toLowerCase().replace(',','');  //4 tablespoons butter
            longUnits.forEach((unit,i) =>{       
                ingredient =  ingredient.replace(unit,units[i]);
                //4 tablespoons butter = 4 tbsp butter
            }); 
            //[pound]
            // 2) Remove  Paranthesis with data bcoz no use
            ingredient = ingredient.replace(/ *\[[^\]]*]/g, ' ');


            //3) Parse ingredients into Count, Unit and ingredients

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            // [ "4" "Tablespoons" "Butter"]
            let objIng;
            if (unitIndex > -1) {
                //We will assume what comes before the units is the number
                //The element is Present
                // 4 1/4 cups , numPlace is [4, 1/2]
                // 4 cups, arrCount is [ 4 ]
                const numPlace = arrIng.slice(0, unitIndex);
                let totalCount;
                    if (numPlace.length === 1) { //4 cups
                        totalCount = eval(numPlace[0].replace('-','+')); 

                    }else{ //4 1/4 cups
                        totalCount = eval(numPlace.join('+'));
                    }
                    
                    objIng = {
                        count : totalCount,
                        unit: arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex + 1).join(' ')
                    };

            }else if(parseInt(arrIng[0], 10)){
                //There is no unit but had number
                objIng = {
                    count : parseInt(arrIng[0],10),
                    unit : '',
                    ingredient : arrIng.slice(1).join(' ')
                }
            }else if (unitIndex === -1){
                //There is no unit and No number
                objIng = {
                    count : 1,
                    unit : '',
                    ingredient
                }
            }

            return objIng;
        })

        this.ingredients = newIngredents;
    }

    updateServings(type) {
            // Type = dec || inc
        //Updates the servings
        
        const newServings = type === 'dec' ? this.calServing - 1 : this.calServing + 1 ;

        //Calculate the Ingredients
        /**
         *  For Calculating the Ingredients Required for no of people 
         *  The default ingredients are required to serve for 4 people
         *  So for 3 people (test Case)
         *  count : 3 -- > 4 people
         *  count : ? -- > 3 people
         *  3 X 3 = 4 X y
         *  y = 3 X 3 / 4 
         *  
         */
        this.ingredients.forEach(el =>{
            el.count *= (newServings / this.calServing)
        });
        this.calServing = newServings;
    }



}


