import * as API from '../utils/ReadableAPI';
// Action types
export const GET_CATEGORIES = 'LOAD_CATEGORIES';
export const GET_POSTS = 'LOAD_POSTS';

//export const GET_CATEGORY_POSTS = 'GET_CATEGORY_POSTS';

// export const ADD_POST = 'ADD_POST';
// export const EDIT_POST = 'EDIT_POST';
// export const DELETE_POST = 'DELETE_POST';

// export const ADD_COMMENT = 'ADD_COMMENT';
// export const EDIT_COMMENT = 'EDIT_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';

// const UPVOTE_POST = 'UPVOTE_POST';
// const DOWNVOTE_POST = 'DOWNVOTE_POST';




// Get Everything from api
export function getCategories() {
  return (dispatch) => {
    // get categories from api then send to store
    API.getCategories()
      .then(categories => dispatch({ type: GET_CATEGORIES, categories }));
  };
}
export function getPosts() {
    return (dispatch) => {
      API.getPosts()
        .then(posts => dispatch({ type: GET_POSTS, posts }));
    };
}
  





// export function getCategoriesData ( categories ){
//     //console.log('cat data from api',categories)
//     // categories = (

//     // )
//     return {
//         type : GET_ALL_CATEGORIES,
//         categories
//     };
// }
    
// export function getPostsData ( posts ){
  
//     return {
//         type : GET_ALL_POSTS,
//         posts
//     };
// }


//import * as API from '../utils/ReadableAPI'
// API.getPosts
// API.getCategories
// API.getCategoryPosts
// API.deletePost


// GET EVERYTHING - send to store
// export const getPosts = () => dispatch => {
//     return API.getPosts().then((posts) => {
//         dispatch({type: GET_ALL_POSTS, posts})
//     })
// }

// export const getCategories = () => dispatch => {
//     return API.getCategories().then((categories) => {
//         dispatch({type: GET_ALL_CATEGORIES, categories})
//     })
// }
