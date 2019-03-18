import { elements } from "./base";
/**
 * --> Render the Item 
 * --> Delete the Item
 */

export const renderItem = item =>{
    const markUp = 
        `<li class="shopping__item" data-itemid = ${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class = "shopping__count--value">
                <p>${item.unit}</p>
        </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="assects/spin.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>`;

    elements.shoppingList.insertAdjacentHTML('beforeend', markUp);
};

export const deleteViewItem = id => {

    const ele = document.querySelector(`[data-itemid = "${id}"]`);
    if(ele) ele.parentElement.removeChild(ele);


};


/**
 * Had to work on deleting the items from the UI and State
 * 
 * Working woth no errors but 
 * task not achieved 
 * had to work on the login or an tipo error
 * 
 */