
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import * as API from '../utils/ReadableAPI';
import { genID } from '../utils/GenID';
import { addNewPost } from '../actions';


class AddPost extends Component {


    state={
     post:{
         category:'react'
     }
    }

    handleChange(event) {
        event.preventDefault();

        let post = this.state.post;
        let name = event.target.name;
        let value = event.target.value;
        post[name] = value;
        this.setState({post})
        console.log(this.state.post)
    }


    handleSubmit(event) {
        event.preventDefault();
        
        let post = this.state.post;
        post.id = genID();
        post.timestamp = Date.now();
        post.author = 'User 1';

        this.setState({post})

        API.addPost(post).then((post) => {
            this.props.addNewPost(post);
            console.log('post from func', post)
        });
        this.props.closeCommentModal()
      //  this.props.history.push("/all")
 
        
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
                        Add post
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
                            <input className="c-flatButton" type="submit" value="Submit" /> 
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
        addNewPost: (data) => dispatch(addNewPost(data))
    }
}   


function mapStateToProps( state ) {
    return {
        categories: state.categories
    }
}   
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPost));