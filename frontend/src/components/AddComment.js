
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


import * as API from '../utils/ReadableAPI';
import { genID } from '../utils/GenID';
import { addNewComment } from '../actions';


class AddComment extends Component {


    state={
     comment:{
         deleted:false,
         parentDeleted:false
     }
    }

    handleChange(event) {

        event.preventDefault();
        
        let comment = this.state.comment;
        let name = event.target.name;
        let value = event.target.value;
        comment[name] = value;
        this.setState({comment})
        console.log(this.state.comment)
        console.log(this.props.match.params.id)
    }


    handleSubmit(event) {

        event.preventDefault();

        let comment = this.state.comment;
        let currentPost = this.props.currentPost[0];
        comment.author = 'User 1';
        comment.id = genID();
        comment.timestamp = Date.now();
        comment.parentId = this.props.match.params.id;
 
        this.setState({ comment })

        API.addComment(comment).then((comment) => {
            this.props.addNewComment(comment); 
        }).then(
            //this.props.history.push(`/all`),
            this.props.history.push('/'+ currentPost.category + '/' + currentPost.id ),
            window.location.reload()
        );
        
         //   this.props.history.push('/posts/' + this.state.comment.parentId )    
        //this.props.history.go(-1);
    }
    
    componentDidMount() {
       
        const parentId = this.props.match.params.id;
        console.log('mount',parentId)

    }


    render() {
        


    return(

        <div>

            <div className="c-card" >

                <div className="c-card_header">
                    <h3 className='subheader'>
                        Add Comment
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
                            <input className="c-flatButton" type="submit" value="Submit" /> 
                        </div>

                    </form>

                </div>
                
            
            </div>

        </div>


        )
    }
}


function mapDispatchToProps( dispatch ) {
    return {
        addNewComment: (data) => dispatch(addNewComment(data)),
    }
}   
function mapStateToProps( state ) {
    return {
        currentPost: state.currentPost,
    }
}   

  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddComment));