import { elements} from './base';
import  { Fraction }  from 'fractional';

export const clearIngredient = () =>{
    elements.recipe.innerHTML = '';

}



/** funcion not valid
const createIngredient = ingredient => {
    `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="assects/spin.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${ingredient.count} </div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>`
}
 */
const formatCount = count => {
    if (count) {
        //count = 2.5 => 2 1/2
        //count = 0.5 => 1/2
                            //  '2.5' = ['2','5'].map()
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el=> parseInt(el,10));
                //0  5
                //2  5
        //[2,5]   [0,5]
        if (!dec) return newCount;

        if (int === 0) {
            const fac = new Fraction(newCount);
            return `${fac.numerator}/${fac.denominator}`;
        }else{
            const fac = new Fraction(newCount-int);
            return `${int} ${fac.numerator}/${fac.denominator}`;
        }
    }
    return `?`;
}

export const renderRecipe = (recipe, isLiked) => {
    const markUp = `
    <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="assects/spin.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="assects/spin.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.calServing}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="assects/spin.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="assects/spin.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="assects/spin.svg#icon-heart${isLiked ? ' ' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>
    <div  class = 'rec-scroll'>
            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">

                ${recipe.ingredients.map(el => `<li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="assects/spin.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${formatCount(el.count)} </div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${el.unit}</span>
                    ${el.ingredient}
                </div>
            </li>`
            ).join('')
            }
                </ul>

                <button class="btn-small recipe__btn--add">
                    <svg class="search__icon">
                        <use href="assects/spin.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}"
                    target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="assects/spin.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    </div>
    
    `;
    elements.recipe.insertAdjacentHTML('afterbegin', markUp);
};


export const updateUiServings = recipe =>{
    //Changing the Number of people serving

    document.querySelector('.recipe__info-data--people').textContent = recipe.calServing;

    //Changing Ingredient count

    const countElement = Array.from(document.querySelectorAll('.recipe__count'));

    // Array of DOM elements
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
    1 whole lemon = formateCount()
    */
    countElement.forEach( (el,i) => {
        el.textContent = formatCount(recipe.ingredients[i].count);
    });


}
