import React, { Component } from 'react';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { printDate } from '../utils/GenID';
import * as API from '../utils/ReadableAPI';
import { setPosts,setPostById, setCurrentPost, deletePost, votePost } from '../actions';
import { loadComments, deleteComment, voteComment } from '../actions';
import Modal from 'react-modal'
import EditComment from './EditComment'
import Button from './Button'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';

class PostDetail extends Component {


    state={
        commentEdit:false,
        commentModalIsOpen: false,
        currentPost:{},
        currentComment:{},
        post:{},
        comments:[]
    }


    openCommentModal = (comment) => {

        
                let testComment = comment.c

                this.setState({
                    currentComment: testComment,
                    commentModalIsOpen: true, 
                }, function () {
                    console.log(this.state);
                });
                


    }

    openAddCommentModal = () => {

        this.setState({
            commentModalIsOpen: true,
            currentComment:null,
        });

    }

      closeCommentModal = () => {
        this.setState({commentModalIsOpen: false});
      }
    


    componentDidMount() {
        console.log(this.props)
        let postId = this.props.match.params.id.replace(/^:+/, "");



        console.log(postId)
        this.setState({currentPost:this.props})

        API.getPostById(postId).then((post) => {
            this.setState({post})
            this.setState({currentPost:post.id})

        });

        this.props.loadComments(postId);
        this.props.setCurrentPost(postId);

        API.getComments(postId).then((comments) => {

            this.setState({comments})

        });
        console.log('prosp on load postDetatil',this.props)
    }

    
    // POST --------------------------------------------------------------------------------------



    upVotePost  = () => {
       
        let postId = this.props.match.params.id;
        API.votePost(postId, 'upVote').then((postId) => {

            toast("Post voted up!");
            this.props.votePost(postId);

        });
        
        this.props.loadComments(postId);

    }

    
    downVotePost = () => {
        
        let postId = this.props.match.params.id;
        API.votePost(postId, 'downVote').then((postId) => {


            this.props.votePost(postId);
         
        });

        this.props.loadComments(postId);

    }


    deletePost = () => {
        
        let postId = this.props.match.params.id;

        API.deletePost(postId);
    

        window.location.reload();
    
    }





    // COMMENTS --------------------------------------------------------------------------------------


    upVoteComment = (e) => {
        
        let commentId = e.currentTarget.title

        API.voteComment(commentId, 'upVote').then(() => {
            
            this.props.votePost(commentId);

        });
    
        window.location.reload();
    }


    downVoteComment = (e) => {
        
        let commentId = e.currentTarget.title
        
        API.voteComment(commentId, 'downVote').then(() => {

            this.props.votePost(commentId);

        });
        
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
        console.log('Props',this.props)
        const { commentModalOpen } = this.state 
        const post = this.state.post
        const comments = this.state.comments
        const newComment = true
        var postData;
        
        console.log(post)
        //let post = this.props.posts.find((post) => {return post.id === postId});
        //let comments = Array.from(this.props.comments)


        if ('id' in post){

      
            postData = (
                <div>
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

                        <div className="c-post_vote">
                        <button className="c-flatButton" onClick={this.upVotePost}>Vote Up <FaThumbsUp /></button>
                        <button className="c-flatButton" onClick={this.downVotePost}>Vote Down <FaThumbsDown /></button>
                        </div>
              
                    </div>


                    <div className="c-comments_header">
                            
                        <h2>Comments: { post.commentCount }</h2>
                        <button className="c-flatButton" value="add" onClick={() => this.openAddCommentModal() } >Add new comment</button>
                        <Link to={`/${post.category}/${post.id}/add-comment`}>
                        add comment link
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
                                                {/* <Button onClick={() => this.openModal({c})}>
                                                    <h3>edit</h3>
                                                </Button> */}
                                                <button className="c-flatButton c-flatButton--grey" value="edit" onClick={() => this.openCommentModal({ c }) }>edit</button>
                                                {/* <Link to={`/${c.parentId}/${c.id}/edit-comment`}>
                                                actual edit link
                                                </Link>  */}
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

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.commentModalIsOpen}
                //onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeCommentModal}
                contentLabel='Modal'
                >
                  
                    <EditComment 
                    comment={this.state.currentComment} 
                    //post={this.state.post}
                    closeCommentModal={this.closeCommentModal}
                    />

                </Modal>
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
         comments:state.comments,
         currentPost:state.currentPost
    }
}   

  

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostDetail));
