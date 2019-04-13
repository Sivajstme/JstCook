import { elements } from "./base";
import { limitRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked =>{

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use')
            .setAttribute('href',`assects/spin.svg#${iconString}`);
}
//  icon - heart - outlined

//Showing the Heart icon when we only pressed liked button

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLiked = like => {
    const markUp = `<li>
                        <a class="likes__link" href="#${like.id}">
                            <figure class="likes__fig">
                                <img src="${like.img}" alt="${like.title}">
                            </figure>
                            <div class="likes__data">
                                <h4 class="likes__name">${like.title }</h4>
                                <p class="likes__author">${like.author}</p>
                            </div>
                            <button class="likes__delete btn-tiny">
                            <svg>
                                <use href="../assects/spin.svg#icon-circle-with-cross"></use>
                            </svg>
                            </button>
                        </a>
                    </li>`;
    
    elements.likesList.insertAdjacentHTML('beforeend', markUp);
}; 

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*= "#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}