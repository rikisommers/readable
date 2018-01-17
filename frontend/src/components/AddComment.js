
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';

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
    }


    handleSubmit(event) {

        event.preventDefault();

        let comment = this.state.comment;
        comment.author = 'User 1';
        comment.id = genID();
        comment.timestamp = Date.now();
        comment.parentId = this.props.match.params.id;
 
        this.setState({ comment })

        // this.state.comment.author = 'User 1';
        // this.state.comment.id = genID();
        // this.state.comment.parentId = this.props.match.params.id;
        // this.state.comment.timestamp = Date.now();
    


        API.addComment(comment).then((comment) => {
            this.props.addNewComment(comment); 
        });
       



        toast("New comment created");

        setTimeout(() => {
            //this.props.history.push("/");
            this.props.history.push('/posts/' + this.props.match.params.id ) 
        }, 600);
          
    }
    
    // componentDidMount() {
       
    //     const parentId = this.props.match.params.id;
    //     console.log('mount',parentId)

    // }


    render() {
        
        const parentId = this.props.match.params.id;
        console.log('render',parentId)




    return(

        <div>
                    <ToastContainer />

            <div className='search-container'>

                <h3 className='subheader'>
                    Add Comment
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

    }
}   

  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddComment));