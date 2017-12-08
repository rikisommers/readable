import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getCategories, getPosts } from '../actions/';

import '../styles/master.css';
import AppBar from './AppBar';
import Category from './Category';
import Posts from './Posts';

//import addComment from 'react-icons/lib/ma/insert-comment';
import IconAddCircle from 'react-icons/lib/md/add-circle';


class App extends Component {


    state = {
        addPostModalOpen: false
    }
    
    openPostModal = () => {
        this.setState(() => ({
          addPostModalOpen: true
        }))
    }

    closePostModal = () => {
        this.setState(() => ({
            addPostModalOpen: false
        }))
    }

    componentDidMount() {
        console.log('props',this.props);
        this.props.dispatch(getCategories())
        this.props.dispatch(getPosts())
    }


    render() {
    const categories = this.props.categories
    const posts = this.props.posts

    // let posts = [];
    // let sortedPosts = this.props.posts.filter( post => post.deleted === false).sort(function(postA, postB){
    //         return postB.voteScore - postA.voteScore;
    // });
  
    // let activeCategory =  this.props.currentCategory;

    // if (activeCategory !== 'all'){
    //     posts = sortedPosts.filter( post => post.category === activeCategory);
    // }else{
    //     posts = sortedPosts;
    // }

        return (

            <div className="App">
                <AppBar />


                <ul className="c-tabs_nav">
                    
                    <li key="all">
                        <Link to={`/`} >{`all`}</Link>
                    </li>

                    { categories && categories.map((category) => (
                        <li key={category.name}>
                            <Link to={`${category.path}`} >{category.name}</Link> 
                        </li>
                    ))}
                    
                </ul>
  



                <div className="c-tabs_content">
                    <Posts />
                </div>

                {/* <Route exact path ='/react' component={props => <PostsMain {...props} />} /> */}



            </div>
        )
    }
}


// map both disptch functions to props
function mapDispatchToProps ({ getCategories, getPosts }){

    return {
    
    }

} 

//export default App
function mapStateToProps ({ categories, posts }) {
    
    return {
        categories,
        posts
    }

}

//export default connect(mapStateToProps)(App)
export default withRouter(connect(mapStateToProps)(App));