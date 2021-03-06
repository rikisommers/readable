
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


import { genID } from '../utils/GenID';

import * as API from '../utils/ReadableAPI';

import { addNewComment, deleteComment, editComment } from '../actions';

// TODO: use edit comment from API
class EditComment extends Component {


    state={
        newComment:false,
        comment:{},
        currentPost:""
    }
   
    handleChange(event) {
  
        let comment = this.state.comment;
        let name = event.target.name;
        let value = event.target.value;
        comment[name] = value;

        this.setState({comment})
        console.log(this.state.comment)
    }



    handleSubmit() {

  

        let comment = this.state.comment;
        let commentId = this.state.comment.id;
        comment.timestamp = Date.now()
        
        if(comment.id){
            
            API.deleteComment(commentId)
            
            API.addComment(comment).then((comment) => {
                this.props.addNewComment(comment)
            }).then(
                console.log(this.state.comment),
                this.props.closeCommentModal(),
            );

        }else{

            comment.author = 'User 1'
            comment.id = genID()
            comment.timestamp = Date.now()
            comment.parentId = this.props.currentPost
     
            this.setState({ comment })
            
            API.addComment(comment).then((comment) => {
                this.props.addNewComment(comment)
            })

        }

    }

    
    componentDidMount() {

        console.log('edit comment props',this.props)

        let comment = this.props.comment
  
        
        if(comment){

            this.setState({
                comment: comment ,
            }, function () {
                console.log(this.state);
            });
    
            document.getElementById('body').value = comment.body;

        }



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