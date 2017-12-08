import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Post extends Component {
    render() {
        const { post } = this.props
        console.log(this.props)
        return(

            <div className="c-card" >

                <div className="c-card_header">
                    <Link to="/">
                <span className="c-card_title">{ post.title }</span>
                    </Link>
                    
                    <span className="c-card_subtitle">cat:{ post.category } score:{ post.voteScore} </span>
                </div>

                <div className="c-card_content">
                    
                    <span className="c-card_subtitle">posted:{ post.timestamp }  by: { post.author}</span>

                    <div className="c-card_text">
                        { post.body }
                        
                    </div>

                    <span className="c-card_subtitle">comments: { post.commentCount }</span>

                </div>
                <div className="c-card_actions">

                    {/* <button className="c-flatButton" onClick={this.editPost}>Edit</button>
                    <button className="c-flatButton" onClick={this.deletePost} >Delete</button> */}
                    <button className="c-flatButton">Edit</button>
                    <button className="c-flatButton">Delete</button>
                    
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