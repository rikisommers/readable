import * as actions from '../actions/'

var initialState = {
    categories:[],
    posts:[],
    comments:{},
    activeCategory:'all',
    activePost:''
};

const appReducer = (state = initialState, action = {}) => {
    
    switch(action.type){

        case actions.GET_CATEGORIES:
            return{
            ...state , 
            'categories': action.categories
            }

        case actions.GET_POSTS:
            return {
                ...state , 
                'posts': action.posts
            }

        case actions.DELETE_POST:
            
            let updatedPosts = state.posts.filter( (post) => post.id !== action.postId);    
            return {
                ...state , 
                'posts': updatedPosts
            }

        default:
            return state

    }
}

export default appReducer;