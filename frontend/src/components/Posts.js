import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import { deletePost } from '../actions/';

import Post from './Post'
//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// TODO: convert to stateless function
class Posts extends Component {


    // deleteButtonPress(id) {
    //     this.props.deletePost(id, () => {});
    // }

    // pass this to postswrap
    // getPosts = ()
    // if posts.length = 0 display message
    // else render posts

        
    deletePost = () => {
        console.log("delete-post")
    }

    editPost = () => {
        console.log("edit-post")
    }


    render() {
       
        const posts = this.props.posts
        console.log(posts)
        return (



            <div className="c-posts">
                
                <div className="c-card_content{">
                    <h3>+ select sort by votes / dates</h3>
                </div>
                
                {
                posts.map((post,index) => 
                    <Post key={post.id} post={post} />
                )};

             
            </div>
        )

    }

    
}



function mapStateToProps ({  posts }) {
    
    return {
        posts,
        deletePost
    }
    // const posts = _.filter(state.posts, post => !post.deleted);
    // const { postsOrder } = state;
    // return { posts, postsOrder }
}

//export default connect(mapStateToProps)(App)
export default withRouter(connect(mapStateToProps)(Posts));
