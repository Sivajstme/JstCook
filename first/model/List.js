/**
 * Used for storing shopping list
 * Can Delete and Update the Shopping list items
 */
import  uniqid  from "uniqid" ;
export default class List {

    constructor(){
        this.items = []; 
    }
    /**
     * For adding the elements to the List
     */
    addItem(count, unit, ingredient){
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }
    /**
     * Find - Finds the element that passes the given funtion 
     * FindIndex returns the index of the el that passes the function 
     */
    deleteItem(id){
        // [2,3,4,5,6].splice(1,2) = [3,4] => [2,5,6]
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index,1);
    }

    update(id, newCount) {
        if (id !== undefined) {
            this.items.find(el => el.id === id).count = newCount;
        }
    }




}