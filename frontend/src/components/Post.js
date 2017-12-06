import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Post extends Component {
    render() {
        const { post } = this.props
        console.log(this.props)
        return(

            <div>
            
                <h2>{ post.title }</h2>
                <div>Category: { post.category }</div>
                <div>
                Posted: { post.timestamp }
                </div>
                <div>
                Votescore: { post.voteScore}
                </div>
                <div>
                Author: { post.author }
                </div>
                <div>
                { post.body }
                </div>
                <div>
                Comments: { post.commentCount }
                </div>


            </div>
        )
    }
}


export default Post;
// function mapStateToProps({ post }) {
//     return {
//         post
//     }
// }
  
// export default connect(mapStateToProps)(Post)