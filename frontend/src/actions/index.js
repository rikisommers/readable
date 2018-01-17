import * as API from '../utils/ReadableAPI';
// avilable functions:
// addPost - obj
// editPost - postId - updatedPost
// deletePost - postId
// addComment - obj
// getComment - commentId
// getComments - postId
// getPostById - postId
// getPosts
// getCategories


// Availble Action types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_POSTS = 'SET_POSTS';
export const SET_POSTS_BY_VOTE = 'SET_POSTS_BY_VOTESCORE';
export const SET_POSTS_BY_CAT = 'SET_POSTS_BY_CAT';

//export const SET_POST = 'SET_POST';


export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST = 'GET_POST';
export const EDIT_POST = 'EDIT_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const VOTE_POST = 'VOTE_POST';

export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const SET_CURRENT_COMMENT = 'SET_CURRENT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';







// TODO:
// split in to action and success - see comments section
// export api calls from here instead of components
// then mapDispatchToProps in comp


// COMMENTS ------------------------------------------------------------------------------



    export function setCategories ( categories ){
      return {
          type : SET_CATEGORIES, 
          categories
      };
    }


    export function setPosts ( posts ){
      return {
          type : SET_POSTS, 
          posts
      }
    }


    export function setPostsByVote ( posts ){
        return {
            type : SET_POSTS_BY_VOTE, 
            posts
        };
    }


    export function setPostsByCat ( category ){
        return {
            type : SET_POSTS_BY_CAT, 
            category
        }
    }


    // export function setPost( post ) {
    //   return {
    //       type: SET_POST,
    //       post
    //   }
    // }





// POST ------------------------------------------------------------------------------------


    export function setCurrentPost( postId ){
      return {
          type : SET_CURRENT_POST, 
          postId
      }
    }



    export function addNewPost ( post ){
      return {
          type : ADD_POST, 
          post
      }
    }



    export function deletePost(post) {
      return {
          type: DELETE_POST,
          post
      }
    }



    export function editPost(postId, post) {
      return {
          type: EDIT_POST,
          postId,
          post
      }
    }



    export function votePost( postId ){
        return {
            type : VOTE_POST, 
            postId
        }
    }



// COMMENTS ------------------------------------------------------------------------------


    export function setComments(postId,comments){
      return {
          type: SET_COMMENTS, 
          postId,
          comments 
      }
    }

    export const loadComments = (postId) => dispatch => {
        return API.getComments(postId).then((comments) => {
            console.log('comments',comments)
            dispatch({type: SET_COMMENTS, comments})
        })
    }



    export function addNewComment ( comment ){
      return {
          type : ADD_COMMENT, 
          comment
      } 
    }


    export function deleteComment(comment) {
      return {
          type: DELETE_COMMENT,
          comment
      }
    }



    export function editComment(commentId,comment) {
      return {
          type: EDIT_COMMENT,
          commentId,
          comment
      }
    }


    export function setCurrentComment( commentId ){
      return {
          type : SET_CURRENT_COMMENT, 
          commentId
      }
    }


    export function voteComment( commentId ){
        return {
            type : VOTE_COMMENT, 
            commentId
        }
    }
