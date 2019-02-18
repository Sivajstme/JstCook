import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.results_output.innerHTML = '';
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

export const renderResults  = recipe =>{
    recipe.forEach(renderRespie);
};