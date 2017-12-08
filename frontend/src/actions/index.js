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


// import {
//   GET_CATEGORIES,
//   GET_POSTS,
//   DELETE_POST
// } from './types';

// Availble Action types
 export const GET_CATEGORIES = 'GET_CATEGORIES';
 export const GET_POSTS = 'GET_POSTS';
// export const ADD_POST = 'ADD_POST';
// export const EDIT_POST = 'EDIT_POST';
 export const DELETE_POST = 'DELETE_POST';
// export const ADD_COMMENT = 'ADD_COMMENT';
// export const EDIT_COMMENT = 'EDIT_COMMENT';
// export const DELETE_COMMENT = 'DELETE_COMMENT';
// export const UPVOTE_POST = 'UPVOTE_POST';
// export const DOWNVOTE_POST = 'DOWNVOTE_POST';




export function getPosts() {
  return (dispatch) => {
    API.getPosts()
      .then(posts => dispatch({ type: GET_POSTS, posts }));
  };
}

export function getCategories() {
  return (dispatch) => {
    API.getCategories()
      .then(categories => dispatch({ type: GET_CATEGORIES, categories }));
  };
}

// split in to action and success
export function deletePost(postId) {
  return (dispatch) => {
    API.deletePost()
      .then(posts => dispatch({ type: GET_POSTS, posts }));
  };
}

// function deletePostSuccess(data) {
//   return {
//       type: DELETE_POST,
//       payload: data
//   }
// }