import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { printDate } from '../utils/GenID';
import * as API from '../utils/ReadableAPI';
import { setPosts,setPostById, setCurrentPost, deletePost, votePost } from '../actions';
import { loadComments, deleteComment, voteComment } from '../actions';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';

class PostDetail extends Component {


    state={
        currentPost:'',
        post:{},
        comments:[]
    }



    componentDidMount() {
        console.log(this.props)
        let postId = this.props.match.params.id.replace(/^:+/, "");



        console.log(postId)
 //       this.setState({})

        API.getPostById(postId).then((post) => {
            this.setState({post})
            console.log('pbyid',post)
        });

        API.getComments(postId).then((comments) => {
            console.log('comments pd',comments)
            this.setState({comments})
            console.log('state pd',this.state)
        });

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

        window.location.reload();
    
    }





    // COMMENTS --------------------------------------------------------------------------------------


    upVoteComment = (e) => {
        
        let commentId = e.currentTarget.title

        API.voteComment(commentId, 'upVote').then(() => {
            
            this.props.votePost(commentId);

        });

        toast(commentId +"voted up!");

        
        
        window.location.reload();
    }


    downVoteComment = (e) => {
        
        let commentId = e.currentTarget.title
        
        API.voteComment(commentId, 'downVote').then(() => {

            this.props.votePost(commentId);

        });
        toast(commentId +"voted down!");

        window.location.reload();
    }


 
    deleteComment = (event) => {

        event.preventDefault();
        let commentId = event.currentTarget.title
        this.props.deleteComment(commentId);
        API.deleteComment(commentId);
        toast("comment deleted");

        window.location.reload();

    }





    render() {

        const post = this.state.post;
        const comments = this.state.comments;
        var postData;
        console.log(post)
        //let post = this.props.posts.find((post) => {return post.id === postId});
        //let comments = Array.from(this.props.comments)


        if ('id' in post){

      
            postData = (
                <div className="c-post" >
                    
                    <div className="c-post_header">
                        <h1 className="c-card_title">Title:{ post.title }</h1>
                        <h2>ID: { post.id }</h2>
                        <br/>

                        <div className="c-card_subtitle">
                            <span className="c-cat">{ post.category }</span>
                            <span>score:{ post.voteScore}</span>
                            <span> comments: { post.commentCount }</span>
                        </div>
                        <div className="c-card_subtitle">
                            <span className="c-user">{ post.author}</span> 
                            <span><b>{ printDate(post.timestamp) }</b></span>
                        </div>
                    </div>

                    <div className="c-post_content">
                        <div className="c-post_text">
                            { post.body }
                        </div>
                    </div>

                    <div className="c-post_actions">
            
                        <div className="c-post_edit">
                            <Link to={`/${post.category}/${post.id}/edit-post`}>
                                <button className="c-flatButton c-flatButton--grey" >Edit</button> 
                            </Link>
                            <button className="c-flatButton c-flatButton--grey" onClick={this.deletePost}>Delete</button>
                        </div>


                        <div className="c-post_vote">
                        <button className="c-flatButton" onClick={this.upVotePost}>Vote Up <FaThumbsUp /></button>
                        <button className="c-flatButton" onClick={this.downVotePost}>Vote Down <FaThumbsDown /></button>
                        </div>
                

                    </div>


                    <div className="c-comments_header">
                            
                        <h2>Comments: { post.commentCount }</h2>
                        <Link to={`/${post.category}/${post.id}/add-comment`}>
                            <button className="c-flatButton">Add new comment</button>
                        </Link>
        
                    </div>

                    {  comments && (
                        <div className="c-comments">
                            
                            {  comments.map((c,index) =>

                                <div className="c-card" id={ c.id } key={ index } >

                                    <div className="c-card_header">
                                        <h2>Parent: { c.parentId }</h2>
                                        <br/>
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



            )


        }else{

            postData = (
                <div className="c-post" >
                    <div className="c-post_header">
                        <h3>This post does not exist</h3>
                    </div>
                    <div className="c-post_actions">
                        <Link to="/all">
                            <h3>Back to home</h3>
                        </Link>
                    </div>
                </div>
            )

 
        }





        return(
        <div className="postWrap">
            <ToastContainer />
            { postData }
        </div>
        )
    }
}


function mapDispatchToProps( dispatch ) {
    return {

     setPosts : (data) => dispatch(setPosts(data)),
     setPostById : (data) => dispatch(setPostById(data)),
     setCurrentPost : (data) => dispatch(setCurrentPost(data)),
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
         comments:state.comments
    }
}   

  

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail));
