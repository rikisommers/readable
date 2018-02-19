import * as actions from '../actions/'



var initialState = {
    categories:[],
    posts:[],
    comments:[],
    activeCategory:'all',
    currentPost:{},
    activePost:{},
    currentComment:{}
};




// TODO: split into post & comments reducers
// Export combined reducer
// Add getPostById
// Move comments to post Obj


const appReducer = (state = initialState, action = {}) => {
    
    switch(action.type){




// ALL ------------------------------------------------------------------------------------


        case actions.SET_CATEGORIES:
            return{
            ...state , 
            'categories': action.categories
            }


        case actions.SET_POSTS:
            return {
                ...state , 
                'posts': action.posts.reverse()
            }

        case actions.SET_ACTIVE_CATEGORY:
            return{
            ...state , 
            'activeCategory': action.category
            }


        case actions.SET_POSTS_BY_VOTE:
            
            let postsOrderedByVote = state.posts.sort(function (a, b) {
                return b.voteScore - a.voteScore;
            });

            return {
                ...state , 
                'posts': postsOrderedByVote
            }



        case actions.SET_POSTS_BY_CAT:

            var postsFilteredByCat = state.posts.filter( (post) => post.category === action.category); 

            return {
                ...state , 
                'posts': postsFilteredByCat
            }

        case actions.SET_POST_BY_ID:
            console.log(action.postId)
            console.log(action.post)
            return {
                ...state , 
                'currentPost': action.post
            }


// POSTS ------------------------------------------------------------------------------------

        // case actions.SET_POST :
        //     let updatedPostsLoad = state.posts.filter( (post) => post.id === action.postId);    
        
        //     return {
        //         ...state, 
        //         'post' : updatedPostsLoad.concat(action.post)
        //     };



        case actions.ADD_POST:
            
            let posts = state.posts; 
            
            return {
                ...state , 
                'posts': posts.concat(action.post)
            }


        case actions.EDIT_POST:
            //error cause missing id? try using pop/other arr action
            let updatedPostsEdit = state.posts.filter( (post) => post.id !== action.postId);   
            
            return {
                ...state , 
                'posts': updatedPostsEdit.concat(action.post)
            }


        case actions.DELETE_POST:

            let updatedPosts = state.posts.filter( (post) => post.id === action.postId);  

            return {
                ...state, 
                'posts': updatedPosts
            }
        
        case actions.SET_CURRENT_POST:

            return {
                ...state, 
                'currentPost' : action.postId
            };
        

        case actions.VOTE_POST:
            
            let curPostVoted = state.posts.filter( (post) => post.id === action.postId);

            return {
                ...state, 
                'currentPost' : curPostVoted
            }

                

// COMMENTS ------------------------------------------------------------------------------------



        case actions.SET_COMMENTS:
            return {
            ...state,
            'comments': action.comments
            }



        case actions.DELETE_COMMENT:

            let updatedComments = state.comments.filter( (comment) => comment.id === action.commentId);  
            

            return {
            ...state,
            'comments': updatedComments

            }


        case actions.EDIT_COMMENT:
            
            let updatedCommentsEdit = state.comments.filter( (comment) => comment.id !== action.commentId);   
            
            return {
                ...state , 
                'comments': updatedCommentsEdit.concat(action.comment)
            }



        case actions.SET_CURRENT_COMMENT:
            let updatedCommentsCurr = state.comments.filter( (comment) => comment.id !== action.commentId);  
            return {
                ...state, 
                'comments': updatedCommentsCurr
            };
                
    
            
        default:
            return state

    }
}




export default appReducer;


// unction comments(state = {}, action) {

//     switch (action.type) {
  
//       case ADD_COMMENT:
//         const comment = action.comment
//         const parentId = comment.parentId
//         return {
//           ...state,
//           [parentId]: [
//             ...state[parentId],
//             comment
//           ]
//         }
  
//       case DELETE_COMMENT:
//         return {
//           ...state,
//           [action.parentId]: state[action.parentId].filter((comment) => comment.id !== action.commentId)
//         }
  
//       case GET_POST_COMMENTS:
//         return {
//           ...state,
//           [action.postId]: action.comments
//         }


