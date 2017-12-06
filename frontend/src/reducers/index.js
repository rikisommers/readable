import * as ACTIONS from '../actions/'
import { combineReducers } from 'redux';

var initialState = {}

export function appReducer(state = initialState, action){
    switch(action.type){

        case ACTIONS.GET_CATEGORIES:
            //return action.categories;
            return{
            ...state , 
            'categories': action.categories
            }
            
        case ACTIONS.GET_POSTS:
            return {
                ...state , 
                'posts': action.posts
            }

            // check if posts exist
            // if(posts) {
            //     return posts.reduce((obj, p) => {
            //       obj[p.id] = p
            //       return obj
            //     }, {})
            // }

        // case ADD_POST:
        //     return{
        //         ...state,
        //         posts:{
        //             ...state[day],
        //             [meal]: recipe.label
        //         }

        //     }

        default:
            return state
    }
}

export default appReducer;


//maybe do this?
// 1: set initial state - wrap following functions
//(state = initialState, action)

// Set up initial state - Get everything in this case you would want to use combineReducer when setting up store 

// export function posts (state = [], action){
//     // define const from actions here eg:
//     // const { name, time, anything } = action 
//     switch(action.type){
//         case GET_ALL_POSTS:
//             // structure you data format here
//             return action.posts
//         default:
//         return state
//     }
// }

// returns api request GET / posts or empty state /  could use null here?

// export function categories (state = [], action){
//     switch(action.type){
//         case GET_ALL_CATEGORIES:
//             return action.categories
//         default:
//             return state
//     }
// }
// returns api request GET / cat


