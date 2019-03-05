//API Key: fa4317ffad37303bb3f9468d447cdfd7
//URL https://www.food2fork.com/api/search

import Search from "./model/Search";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView'
import { elements, renderLoader , clearLoader} from "./views/base";
import  Recipe  from "./model/Recipe";

/** Global State of the App
 * - Search Object
 * - Current Recipe Object
 * - Shopping List object
 * - Liked Recipes
 */


const state = {};
/**
 * Search Controller
 */
const controlSearch = async () => {

    //Take the Query form the View
    const query = searchView.getInput(); //From View
    //const query = 'pizza'
    console.log(query)
    //If Query
    if (query) {
        // Add new search to the State
        state.search = new Search(query);

        //Prepare UI for result
        renderLoader(elements.show_results);
        searchView.clearInput();
        searchView.clearResults();
    try{
        //Search for Recipes
        await state.search.getResults();
        
        //console.log(state.search.data);
        searchView.renderResults(state.search.data);
        elements.show_results.style.display = 'block';

        //Render the results on UI
        clearLoader();
    }catch(err){
        alert('Error Processing the Recipe');
        clearLoader();
    }
    }


}


elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
    elements.headerTransform.classList.add('AfterSubmit');
    elements.searchBar.classList.add('aftrSearch');
});

/*Testing
window.addEventListener('load', e=>{
    e.preventDefault();
    controlSearch();
}) */
/** 
 * Recipe Controller
 */

    
    // const searchRecipe = new Recipe('35382')

    // searchRecipe.getRecipe();
    // console.log(searchRecipe);

const controlRecipe = async () =>{

    //Window.location returns the entire url
    //.hash returns the part after the #
    //the returned is a string so all string methods can be called 
    //replace '#' to an empty cahnracter 


    //Get ID from the url
    const id = window.location.hash.replace('#','');    
    if (id) {
        //prepare DOM for changes
        //renderLoader(elements.recipe);

        //create new Recipe Object
        state.recipe = new Recipe(id);
        console.log(id);
        //window.r = state.recipe;
        try{
        //Get recipe Data and parse Ingredients
        await state.recipe.getRecipe();

        console.log(state.recipe.ingredients); //Displaying the Array before Parsing

        //Parsing the Ingredients before logging
        state.recipe.parseIngredients();
    
        //calculate serving and time 
        state.recipe.calcTime();
        state.recipe.calServing();
        //Render Recipes
        //clearLoader();
            recipeView.renderRecipe(state.recipe)
        
        }catch(err){

        console.log(err);
        }

    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));










