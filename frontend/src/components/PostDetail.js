import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { printDate } from '../utils/GenID';
import * as API from '../utils/ReadableAPI';
import { setPosts, setCurrentPost,deletePost, editPost, votePost } from '../actions';
import { loadComments, deleteComment, voteComment } from '../actions';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';

class PostDetail extends Component {


    state={
        currentPost:'',
        postModalOpen: false,
    }



    
    // POST --------------------------------------------------------------------------------------



    upVotePost  = () => {
       
        let postId = this.props.match.params.id;
        API.votePost(postId, 'upVote').then((postId) => {

            toast("Post voted up!");
            this.props.votePost(postId);

        });
        
        // not ideal
        window.location.reload();
    }

    
    downVotePost = () => {
        
        let postId = this.props.match.params.id;
        API.votePost(postId, 'downVote').then((postId) => {

            toast("Post voted down!");
            this.props.votePost(postId);
         
        });

        // not ideal
        window.location.reload();
    }


    deletePost = () => {
        
        let postId = this.props.match.params.id;

        API.deletePost(postId);
    
        toast("Post deleted");

        this.props.history.push("/"); 
    
    }





    // COMMENTS --------------------------------------------------------------------------------------


    upVoteComment = (e) => {
        
        let commentId = e.currentTarget.title

        API.voteComment(commentId, 'upVote').then(() => {
            
            this.props.votePost(commentId);

        });

        toast(commentId +"voted up!");

        
        // not ideal
        window.location.reload();
    }


    downVoteComment = (e) => {
        
        let commentId = e.currentTarget.title
        
        API.voteComment(commentId, 'downVote').then(() => {

            this.props.votePost(commentId);

        });
        toast(commentId +"voted down!");


        // not ideal
        window.location.reload();
    }


 
    deleteComment = (event) => {

        event.preventDefault();
        let commentId = event.currentTarget.title
        this.props.deleteComment(commentId);
        API.deleteComment(commentId);
        toast("comment deleted");
        

    }


    componentDidMount() {
       
        let postId = this.props.match.params.id;
        API.getPosts().then((posts) => {
            this.props.setPosts(posts);
        });

        if ( postId ){
            
            this.props.setCurrentPost(postId);
            this.props.loadComments(postId);

        }

    }


    render() {
        
        
        const postId = this.props.match.params.id;
        let post = this.props.posts.find((post) => {
             return post.id === postId
        });
           
        let comments = Array.from(this.props.comments)
        console.log('props from postDetail',this.props)


        return(
        <div className="postWrap">
        
        <ToastContainer />

                
            {  post && (
                
                <div className="c-post" >
                    
                    <div className="c-post_header">
                        <h1>{ post.title }</h1>
                        <span className="c-card_subtitle">
                            <span className="c-cat">{ post.category }</span> { printDate(post.timestamp) } 
                            <span className="">{ post.voteScore }</span>
                        </span>
                    </div>

                    <div className="c-post_content">
                        <div className="c-post_text">
                            { post.body }
                        </div>
                    </div>

                    <div className="c-post_actions">
            
                        <div className="c-post_edit">
                            <Link to={'/edit-post/' + post.id}>
                                <button className="c-flatButton c-flatButton--grey" >Edit</button> 
                            </Link>
                            <button className="c-flatButton c-flatButton--grey" onClick={this.deletePost}>Delete</button>
                        </div>


                        <div className="c-post_vote">
                        <button className="c-flatButton" onClick={this.upVotePost}>Vote Up <FaThumbsUp /></button>
                        <button className="c-flatButton" onClick={this.downVotePost}>Vote Down <FaThumbsDown /></button>
                        </div>
                

                    </div>
                </div>
            )}
 

            
            {  comments && (
            <div className="c-comments">
                    
                    <div className="c-comments_header">
                        
                        <h2>Comments</h2>
                        <Link to={postId +'/add-comment'}>
                            <button className="c-flatButton">Add new comment</button>
                        </Link>

                    </div>


                    {  comments.map((c,index) =>

                        <div className="c-card" id={ c.id } key={ index } >

                            <div className="c-card_header">
                                <span className="c-card_subtitle">
                                    <span className="c-user">{ c.author }</span> Vote score:{ c.voteScore}
                                </span>
                            </div>
                            
                            <div className="c-card_content">
                              { c.body }
                            </div>

                            <div className="c-card_actions">

                                <div className="c-comment_edit">       
                                    <Link to={'/edit-comment/:' + c.id}>
                                        <button className="c-flatButton c-flatButton--grey">edit</button>
                                    </Link> 
                                    <button className="c-flatButton c-flatButton--grey" title={ c.id } onClick={ this.deleteComment }  >Delete</button>
                                </div>

                                <div className="c-comment_vote">
                                    <button className="c-flatButton" title={ c.id } onClick={ this.upVoteComment } >Vote Up <FaThumbsUp /></button>
                                    <button className="c-flatButton" title={ c.id } onClick={ this.downVoteComment } >Vote Down <FaThumbsDown /></button>
                                </div>

                            </div>

                        </div>
                    )}
            </div>
            )}


        </div>

    )}}

function mapDispatchToProps( dispatch ) {
    return {

     setPosts : (data) => dispatch(setPosts(data)),
     setCurrentPost : (data) => dispatch(setCurrentPost(data)),
     editPost : (data) => dispatch(editPost(data)),
     deletePost : (data) => dispatch(deletePost(data)),
     votePost : (data) => dispatch(votePost(data)),
     
     loadComments : (data) => dispatch(loadComments(data)),
     deleteComment : (data) => dispatch(deleteComment(data)),
     voteComment : (data) => dispatch(voteComment(data))
    }
}   


function mapStateToProps(state) {
    return {
         posts:state.posts,
         comments:state.comments,
         currentPost:state.currentPost
    }
}   
  

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail));
