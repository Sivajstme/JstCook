//API Key: fa4317ffad37303bb3f9468d447cdfd7
//URL https://www.food2fork.com/api/search

import Search from "./model/Search";
import * as searchView from './views/searchView';
import {elements} from "./views/base";
/** Global State of the App
 * - Search Object
 * - Current Recipe Object
 * - Shopping List object
 * - Liked Recipes
 */
const state = {};
const controlSearch = async () => {

    //Take the Query form the View
    const query = searchView.getInput(); //From View
    console.log(query)
    //If Query
    if (query) {
        // Add new search to the State
        state.search = new Search(query);

        //Prepare UI for result


        //Search for Recipes
        await state.search.getResults();
        console.log(state.search.data);
        //Render the results on UI

    }


}


elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();


})







//const search = new Search('bread');

//search.getResults();

