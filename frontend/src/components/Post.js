import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import { printDate } from '../utils/GenID';
import {Link} from 'react-router-dom'





// import all post actions

class Post extends Component {



    state={
        currentPost:{}
    }



      
    render() {
        
        const { post } = this.props
    
        //let postDate = post.timestamp.toString();

        ///const url = post.title.replace(/\s+/g, '-');

        return(

            <div className="c-card" postid = { post.id }>
                
                <div className="c-card_header">
                    <Link to={`/posts/${ post.id }`
                    }>
                        <h2 className="c-card_title">{ post.title }</h2>
                    </Link>
                    <span className="c-card_subtitle">cat:{ post.category } score:{ post.voteScore} </span>
                </div>

                <div className="c-card_content">
                    
                    <span className="c-card_subtitle">
                    <span className="c-user">{ post.author}</span> <b>{ printDate(post.timestamp) }</b>
                    </span>
                    <div className="c-card_text">
                        { post.body }
                    </div>

                    <span className="c-card_subtitle">comments: { post.commentCount }</span>


                </div>

            </div>


        )
    }
}


//export default Post;

function mapStateToProps( state ) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}   
  
export default withRouter(connect(mapStateToProps)(Post));