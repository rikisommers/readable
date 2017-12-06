import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { getCategories, getPosts } from '../actions/';

import PostsList from './PostsList';
import Category from './PostsList';
import '../styles/App.css';

class App extends Component {


    componentDidMount() {
       this.handleGetPosts();
       this.handleGetCategories();
    }

    
    // you can use mapDispatchToPorps instead of this approach
    handleGetCategories = () => {
        this.props.dispatch(getCategories())
    }
    handleGetPosts = () => {
        this.props.dispatch(getPosts())
    }




    render() {
    //console.log(this.props.state)
    const categories = this.props.categories
    console.log(categories)
    

        return (

            <div className="App">
                
                
                <nav className="nav">
                    <ul className="nav-list">

                        { categories && categories.map((category) => (
                            <li key={category.name}>
                                
                                <Link to={`${category.path}`} >{category.name}</Link> 
                                {/* 
                                Pass state or hash if you need to
                                <Link to={{
                                pathname: '/courses',
                                search: '?sort=name',
                                hash: '#the-hash',
                                state: { fromDashboard: true }
                                }}> */}
                                    
                            </li>
                        ))}
                        
                    </ul>
                </nav> 

                
                <Route exact path ='/' render={({ history }) => (
                    <PostsList/>
                )}/>

                {/* <Route exact path ='/react' component={(Category)} /> */}



            {/* <Route path="/" exact component={PostsMain} />
            <Route path="/posts/new" exact component={PostsNew} />
            <Route path="/:category" exact component={props => <PostsMain {...props} />} />
            <Route path="/:category/edit/:id" children={props => <PostsEdit {...props}/>} />
            <Route path="/:category/:id" exact component={PostsDetail} />
            <Route path="/:category/:id/comments/new" component={CommentsNew} />
            <Route path="/:category/:postId/comments/edit/:id" component={props => <CommentsEdit {...props}/>} />
            <Route path="*" component={NotFound} /> */}


            </div>
        )
    }
}


// function mapDispatchToProps (dispatch) {
//         return (
//             dispatch(getCategories()),
//           dispatch(getPosts())
//         )
// }

//export default App
function mapStateToProps ({ categories, posts }) {
    console.log('App cat:',categories)
    console.log('App posts:',posts)
    
                // check if posts exist
            // if(posts) {
            //     return posts.reduce((obj, p) => {
            //       obj[p.id] = p
            //       return obj
            //     }, {})
            // }

    // reformat your data here
    // TODO: reformat timestamp 

    return {
        categories,
        posts
    }

}

//export default 
//export default connect(mapStateToProps)(App)
export default withRouter(connect(mapStateToProps)(App));