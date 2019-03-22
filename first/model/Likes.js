export default class Likes{

    constructor(){
        this.likes = [];
    }

    addLikes(id, title, author, img){
        const likes = {
            id,
            title,
            author,
            img
        }
        this.likes.push(likes);

        //Adding likes data to the Local Storage
        this.storeLikes();

        return likes;
    }
    deleteLikes (id){
        // [3,4,5,6].splice 
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id){
        //  [a,b,c,d,f] 
        //[d]
        //if element not in the liked list, method return false
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLiked(){
        return this.likes.length;
    }


    storeLikes(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }

    readLikes(){
        //Reading the data which was saved in local Storage
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }
} 