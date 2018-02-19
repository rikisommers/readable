import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import { printDate } from '../utils/GenID';
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

import Modal from 'react-modal'

import * as API from '../utils/ReadableAPI';
import { openModal , closeModal } from '../utils/Modal';
import {  setCurrentPost, deletePost, editPost, votePost } from '../actions';
import EditPost from './EditPost';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';


// import all post actions

class Post extends Component {


    state = {
        postModalIsOpen: false,
        post:{}
    }

    openModal = () => {

        this.setState({
            postModalIsOpen: true
        })
    
    }
    
    closeModal = () => {
    this.setState({postModalIsOpen: false})
    }

    
    componentDidMount() {
        console.log('post p',this.props )
        let postId = this.props.post.id;
        

        if ( postId ){
            
            this.props.setCurrentPost(postId);
        
        }
        
    }


    // POST --------------------------------------------------------------------------------------

    upVotePost  = () => {
       
        let postId = this.props.post.id;
        API.votePost(postId, 'upVote').then((postId) => {

            toast("Post voted up!");
            this.props.votePost(postId);

        });
        
        // not ideal
        window.location.reload();
    }

    
    downVotePost = () => {
        
        let postId = this.props.post.id;
        API.votePost(postId, 'downVote').then((postId) => {

            toast("Post voted down!");
            this.props.votePost(postId);
         
        });

        // not ideal
        window.location.reload();
    }


    deletePost = (event) => {
        
        //let postId = this.props.match.params.id;
        let  postId = this.props.post.id;
        API.deletePost(postId);
        //toast("Post deleted");
        window.location.reload();

    }



      
    render() {
        
        const { post }  = this.props
        //let postDate = post.timestamp.toString();
        ///const url = post.title.replace(/\s+/g, '-');

        return(

            <div className="c-card" postid = { post.id }>
                

                <div className="c-card_header">
                    <Link 
                    to={`/${ post.category}/${ post.id }`
                    }>
                        
                        <h1 className="c-card_title">Title:{ post.title }</h1>
                        <h2>ID: { post.id }</h2>
                        
                    </Link>
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


                <div className="c-card_content">
                    <div className="c-card_text">
                        { post.body }
                    </div>
                </div>


                <div className="c-card_actions">
            
                    <div className="c-post_edit">
                        
                            <button className="c-flatButton c-flatButton--grey" onClick={() => this.openModal() } >Edit</button> 
                            {/* <Link to={`/${post.category}/${post.id}/edit-post`}>
                        </Link> */}
                        <button className="c-flatButton c-flatButton--grey" name={ post.id } onClick={this.deletePost}>Delete</button>
                    </div>


                    <div className="c-post_vote">
                    <button className="c-flatButton" name={ post.id } onClick={this.upVotePost}>Vote Up <FaThumbsUp /></button>
                    <button className="c-flatButton" name={ post.id } onClick={this.downVotePost}>Vote Down <FaThumbsDown /></button>
                    </div>

                </div>

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.postModalIsOpen}
                //onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closePostModal}
                contentLabel='Modal'
                >
                  
                    <EditPost
                    closeModal={this.closeModal}
                    post={post}
                    />

                </Modal>


            </div>


        )
    }
}


//export default Post;

function mapDispatchToProps( dispatch ) {
    return {
     setCurrentPost : (data) => dispatch(setCurrentPost(data)),
     editPost : (data) => dispatch(editPost(data)),
     deletePost : (data) => dispatch(deletePost(data)),
     votePost : (data) => dispatch(votePost(data))
    }
}   

function mapStateToProps( state ) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}   
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post));