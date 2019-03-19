export const elements = {
    searchForm: document.querySelector('.search__input'),
    searchInput: document.querySelector('.search_field'),
    headerTransform: document.getElementById('jstCook'),
    searchBar: document.getElementById('searchBar'),
    results_output: document.querySelector('.results__list'),
    show_results: document.querySelector('.results'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list')
};
export const elementStrings = {
    loader : 'loader'
}
export const renderLoader = parent => {
    const loader = `
        <div class = ${elementStrings.loader}>
            <svg>
                <use href="../assects/spin.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () =>{
    const loader =  document.querySelector(`.${elementStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader)


}
