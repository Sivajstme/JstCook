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
        searchView.clearInput();
        searchView.clearResults();

        //Search for Recipes
        await state.search.getResults();
        console.log(state.search.data);
        searchView.renderResults(state.search.data);
        elements.show_results.style.display = 'block';

        //Render the results on UI

    }


}


elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
    elements.headerTransform.classList.add('AfterSubmit');
    elements.searchBar.classList.add('aftrSearch');
    


})







//const search = new Search('bread');

//search.getResults();

