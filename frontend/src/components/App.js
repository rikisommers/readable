import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';



import '../styles/master.css';
import AppBar from './AppBar';
import { ToastContainer } from 'react-toastify';

import Posts from './Posts';


import PostDetail from './PostDetail';
import AddPost from './AddPost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';



// TODO: remove add: routes - use modals instead
class App extends Component {


    render() {
    
        return (

            <div className="App">
                <AppBar />
                <ToastContainer />
                
                    <Route exact path = '/' component={ Posts } />
                    <Route exact path = '/posts/:id'  component={ PostDetail } />
                    <Route exact path = '/add-post' component={ AddPost } /> 
                    <Route exact path = '/edit-post/:postId?' component={ EditPost }/>
                    <Route exact path = '/posts/:id/add-comment' component={ AddComment } /> 
                    <Route exact path = '/edit-comment/:commentId?' component={ EditComment } />

            </div>
        )
    }
}

export default withRouter(connect()(App));