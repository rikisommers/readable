
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

    }



    handleSubmit(event) {
        event.preventDefault();
    
        let comment = this.state.comment;
        let commentId = this.state.comment.id;
        let activeCategory = this.props.activeCategory;
        let currentPost = this.props.currentPost[0];

        comment.timestamp = Date.now();
        this.setState({ comment })

        API.deleteComment(commentId).then(
        API.addComment(comment).then((comment) => {
            this.props.addNewComment(comment); 
        }));

        //console.log('rthis comment',comment);
        this.props.history.push('/'+ currentPost.category + '/' + currentPost.id ) 


    }

    
    componentDidMount() {
        console.log('edit comment',this.props)
        
        // use url - get by Id
        let comment = this.state.comment;
        let commentId = this.props.match.params.commentId;
        
        console.log(commentId)
        
        let currentComment = this.props.comments.find(function(c){ return c.id === commentId});
        
        console.log(currentComment)
        
        let currentPost = this.props.currentPost[0]

        // this.setState(state => ({
        //     currentPost: currentPost
        // }));
        
        if( currentPost ){
            
            comment.parentId = currentPost.id
            this.setState({ comment })

        }

        if( currentComment ){
            console.log('cc id',currentComment)
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

            console.log(this.state)
            


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
            
            <div className="c-card" >

                <div className="c-card_header">
                    <h3 className='subheader'>
                        EDIT Comment
                    </h3>
                </div>

                <div className="c-card_content">
    
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
        currentPost: state.currentPost,
        activeCategory:state.activeCategory
    }
}   
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditComment));