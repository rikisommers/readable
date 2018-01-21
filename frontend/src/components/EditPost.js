
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as API from '../utils/ReadableAPI';

import { toast } from 'react-toastify';

import { addNewPost,deletePost,editPost,setPosts } from '../actions';



// TODO : make sure resubmited form grabs current vals  ------------------------------------_VVVVVVV



class AddPost extends Component {


    state={
     post:{}
    }

    
    componentDidMount() {

        let currentPost = this.props.currentPost[0]
        let post = this.state.post;

        if( currentPost ){
            
            // populate form from currentPost data
            document.getElementById('category').value = currentPost.category;
            document.getElementById('title').value = currentPost.title;
            document.getElementById('body').value = currentPost.body;

            // populate post in state in case user submits form with no change
            post.id = currentPost.id;
            post.title = currentPost.title
            post.body = currentPost.body
            post.author = currentPost.author
            post.category = currentPost.category

        }
        
    }

    
    handleChange(event) {

        // populatecomponent state on form change
        event.preventDefault();
        let post = this.state.post;
        let name = event.target.name;
        let value = event.target.value;
        post[name] = value;
        this.setState({post})
        console.log('on change',this.state.post)
    }


    handleSubmit(event) {
        event.preventDefault();

        let currentPost = this.props.currentPost[0]
        if( currentPost ){

            let post = this.state.post;
            let postId = currentPost.id;

            // get new timestamp, set in state
            post.timestamp = Date.now();
            post.author = 'User 1';
            this.setState({ post });

            console.log('on submit',this.state.post);

            // replace existing post in store
            API.deletePost(postId).then((post) => {
                this.props.deletePost(post);
            }).then(
            API.addPost(post).then((post) => {
                this.props.addNewPost(post);
            }));
            
            toast("post updated");
            //this.props.history.push("/");
            this.props.history.go(-1);
        }
        
     
    }


    render() {
      const categories = this.props.categories;
      //const selectCategory = this.state;
      //let category = 'none'

    return(

        <div className="c-posts">
            

            <div className="c-card" >

                <div className="c-card_header">
                    <h3 className='subheader'>
                        EDIT POST
                    </h3>
                </div>

                <div className="c-card_content">
    
                    <form onSubmit={this.handleSubmit.bind(this)}>
            
                            <div className="form-group">

                                <select id="category"
                                //value={newCategory}
                                name='category'
                                onChange={this.handleChange.bind(this)}
                                >

                                    <option disabled>Select category...</option>
                                    <option value="none" name='none'>None</option>
                                    
                                    { categories && categories.map((category) => (
                                        <option key={category.name} value={category.name} >{category.name}</option> 
                                    ))}

                                </select>

                                
                            </div>

                            <div className="form-group">
                                <input id="title"
                                    className='post-title'
                                    name='title'
                                    type='text'
                                    placeholder='Post title'
                                    onChange={this.handleChange.bind(this)}
                                    value={this.props.post}
                                    //ref={(input) => this.title = input } 
                                />
                            </div>


                            <div className="form-group">
                                <input id="body"
                                    className='post-body'
                                    name='body'
                                    type='textarea'
                                    placeholder='Post body'
                                    onChange={this.handleChange.bind(this)}
                                    //ref={(input) => this.body = input } 
                                />
                            </div>

                            <div className="form-group">
                                <input className="c-flatButton c-flatButton--grey" type="submit" value="Save" /> 
                            </div>

                    </form>

                </div>
                
            </div>

        </div>


        )
    }
}

//export default AddPost;

function mapDispatchToProps( dispatch ) {
    return {
        addNewPost: (data) => dispatch(addNewPost(data)),
        deletePost: (data) => dispatch(deletePost(data)),
        setPosts: (data) => dispatch(setPosts(data)),
        editPost: (data) => dispatch(editPost(data))
    }
}   


function mapStateToProps( state ) {
    return {
        categories: state.categories,
        posts: state.posts,
        currentPost: state.currentPost
    }
}   
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPost));