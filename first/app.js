//API Key: fa4317ffad37303bb3f9468d447cdfd7
//URL https://www.food2fork.com/api/search

import Search from "./model/Search";
import * as searchView from './views/searchView';
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
        console.log(state.search.data);
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



        //create new Recipe Object
        state.recipe = new Recipe(id);

        try{
        //Get recipe Data
        await state.recipe.getRecipe();
        //calculate serving and time 
        state.recipe.calcTime();
        state.recipe.calServing();

        //Render Recipe
        console.log(state.recipe)
        
        }catch(err){
        alert(`Error Processing Recipe!!
                Try again Later`);
        }

    }

}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe)); 