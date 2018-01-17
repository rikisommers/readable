
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


import { toast } from 'react-toastify';


import * as API from '../utils/ReadableAPI';
//import { genID } from '../utils/GenID';
import { addNewComment, deleteComment, editComment } from '../actions';

// TODO: use edit comment from API
class EditComment extends Component {


    state={
        comment:{},
        currentPost:{}
    }
   
    handleChange(event) {
        //event.preventDefault();
        let comment = this.state.comment;
        let name = event.target.name;
        let value = event.target.value;
        comment[name] = value;

        this.setState({comment})
        console.log('on change',comment)
    }



    handleSubmit(event) {
        event.preventDefault();
    
        let comment = this.state.comment;
        let commentId = this.state.comment.id;

        comment.timestamp = Date.now();
        this.setState({ comment })

        API.deleteComment(commentId).then(
        API.addComment(comment).then((comment) => {
            this.props.addNewComment(comment); 
        }));
       
        console.log('on submit', comment)

        toast("comment updated");

        setTimeout(() => {
            this.props.history.push('/posts/' + this.state.comment.parentId ) 
        }, 600);

    }

    
    componentDidMount() {
        console.log('edit comment',this.props)
        
        // use url - get by Id
        let comment = this.state.comment;
        let commentId = this.props.match.params.commentId.replace(":","");
        let currentComment = this.props.comments.find(function(c){ return c.id === commentId});
        let currentPost = this.props.currentPost[0]

        // this.setState(state => ({
        //     currentPost: currentPost
        // }));
        
        if( currentPost ){
            
            comment.parentId = currentPost.id
            this.setState({ comment })

        }

        if( currentComment ){
            //console.log('cc id',currentComment.id)
            document.getElementById('body').value = currentComment.body;
            
            // -- populate comment for dispatch
            comment.id = commentId;
            comment.author = 'User 1';
            comment.deleted = currentComment.deleted;
            comment.parentDeleted = currentComment.parentDeleted;
            comment.voteScore = currentComment.voteScore; 

            this.setState({comment})

            // this.state.comment.id = commentId;
            // this.state.comment.author = currentComment.author;
            // this.state.comment.deleted = currentComment.deleted;
            // this.state.comment.parentDeleted = currentComment.parentDeleted;
            // this.state.comment.voteScore = currentComment.voteScore;       

            //console.log(this.state)
            


        }


     //   document.getElementById('author').value = currentPost.author;

      




       // document.getElementById('body').value = currentPost.body;



        // if( currentPost ){

        //     console.log('currentPost',currentPost)
        //     console.log(currentPost.title);

        //     document.getElementById('body').value = currentPost.body;
        //     document.getElementById('author').value = currentPost.author;

        // }

       
    }


    render() {

    return( 

        <div>
            
            <div className='search-container'>

                <h3 className='subheader'>
                    EDIT COMMENT
                </h3>

                <div className='addPost'>
    
                    <form onSubmit={this.handleSubmit.bind(this)}>
        
                     


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
                            <input className="c-flatButton" type="submit" value="Save" /> 
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
        addNewComment: (data) => dispatch(addNewComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
        editComment: (data) => dispatch(editComment(data))
    }
}   


function mapStateToProps( state ) {
    return {
        categories: state.categories,
        posts: state.posts,
        comments: state.comments,
        currentPost: state.currentPost
    }
}   
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditComment));