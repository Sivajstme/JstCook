import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.results_output.innerHTML = '';
}
//Very Long String 
//  [ 'Very' , 'Long' , 'String']
//1st Iteration : very.lenght = 5 <= 17 { [].push(very) }
const limitRecipeTitle = (title, limit = 17) =>{
    if (title.length > limit) {
        //Do Somethig
        const newArr = [];
            title.split(' ').reduce((acc,cur)=>{
                if (cur.length <= limit) {
                    newArr.push(cur);
                }
                return acc + cur.length;
            },0);
            return `${newArr.join(' ')} ...`;

    }
    return title;
}
const renderRespie = recipe =>{
    const markUp = `
        <li >
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="Test">
                        </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li> `

        elements.results_output.insertAdjacentHTML('beforeend',markUp);
};
//numResults = 30 ; resPerPage = 10;
// 30/5
const renderButton = (page, numResults, resPerPage ) =>{
    const pages = Math.ceil(numResults/resPerPage);
        if (page === 1 && pages > 1 ) {
            //Button to go to the page - 2
        }else if(page < pages){
            //Both Buttons
        }
        else if (page === pages && pages > 1) {
            //Button to go to previous page 
        }

}
export const renderResults  = (recipe, page = 1, resPerPage = 10) =>{
    
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;

    recipe.slice(start,end).forEach(renderRespie);
};








