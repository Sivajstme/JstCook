//API Key: fa4317ffad37303bb3f9468d447cdfd7
//URL https://www.food2fork.com/api/search

import Search from "./model/Search";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView'
import List from './model/List'
import * as listView from './views/listView'
import { elements, renderLoader , clearLoader} from "./views/base";
import  Recipe  from "./model/Recipe";

/** Global State of the App
 * - Search Object
 * - Current Recipe Object
 * - Shopping List object
 * - Liked Recipes
 */

const state = {};
window.state = state;
/**
 * Search Controller
 */
const controlSearch = async () => {

    //Take the Query form the View
    const query = searchView.getInput(); //From View
    //const query = 'pizza'
    console.log(query);
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
        console.log(err);
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
        elements.recipe.style.display = 'block';
        //prepare DOM for changes
        recipeView.clearIngredient()    
        renderLoader(elements.recipe);

        //Highlight the selected item
        if(state.search) searchView.resultSelected(id);

        //create new Recipe Object  
        state.recipe = new Recipe(id);
        console.log(id);
        //window.r = state.recipe;
        try{
        //Get recipe Data and parse Ingredients
        await state.recipe.getRecipe();

        //Displaying the Array before Parsing

        //console.log(state.recipe.ingredients); 

        //Parsing the Ingredients before logging
        state.recipe.parseIngredients();
    
        //calculate serving and time 
        state.recipe.calcTime();
        state.recipe.calServing();
        //Render Recipes
        clearLoader();
            recipeView.renderRecipe(state.recipe)
        
        }catch(err){
        console.log(err);
        }

    }

}

/**
 *  List Controller
 * 
 */

const controlList = () => {

    // Create a new list If there is none Yet
    if (!state.list) state.list = new List();

    //Add Each Ingredient to the List 
    state.recipe.ingredients.forEach(el => {
        const items = state.list.addItem(el.count,el.unit,el.ingredient);
        listView.renderItem(items);
    });

}
//Delete and Update List Item Events
elements.shoppingList.addEventListener('click',e =>{
    console.log(e.target);
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    //Handling the Delete Item
    if (e.target.matches('.shopping__delete ,.shopping__delete *')) {
        
        //Delete From the state
        state.list.deleteItem(id);
        
        //Delete From UI
        listView.deleteViewItem(id);
    } else if (e.target.matches('.shopping__count--value')){
        const val = parseFloat(e.target.value,10);
        state.list.update(id,val);
    }

});

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load',controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));

elements.recipe.addEventListener('click', e =>{
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //Decrease the  count
        if (state.recipe.calServing > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateUiServings(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //Increase the count 
        state.recipe.updateServings('inc');
        recipeView.updateUiServings(state.recipe);

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }
}); 

window.list = new List();





