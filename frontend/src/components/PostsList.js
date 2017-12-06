import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './Post'

// TODO: convert to stateless function
class PostsList extends Component {



    render() {
        console.log('postList', this.props)
        const posts = this.props.posts
        return (
            <div className="posts">
            <h2>Posts</h2>
            
                { posts && posts.map((post) => (
                    <div key={post.title}>

                        <Post 
                        post={ post }
                        //openPost={ openPost }
                        />
                        
                    </div>
                ))}
            
            </div>
        )        
    }
}

//export default PostsList;

function mapStateToProps({ posts }) {
    return {
        posts
    }
}
  
export default connect(mapStateToProps)(PostsList)
