import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route,Link,Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '../styles/master.css';

import * as  API from '../utils/ReadableAPI.js'; 
import { setCategories, setPosts, setPostsByVote, setActiveCategory,addNewPost  } from '../actions/';

import Modal from 'react-modal'
import AppBar from './AppBar';
import Posts from './Posts';
import PostDetail from './PostDetail';
import AddPost from './AddPost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';



// TODO: remove add: routes - use modals instead
class App extends Component {

    state = {
        postModalIsOpen: false,
        category:'all',
        posts:[]
    }
   
    componentDidMount() {

       let category = this.state.category;

        API.getCategories().then((categories) => {
            this.props.setCategories(categories);
        })

        this.setPostsByCat(category);
 
    }

// ---------------------------------------------_POST




// ---------------------------------------------_MODAL
    openAddCommentModal = () => {

        this.setState({
            commentModalIsOpen: true,
            currentComment:null,
        });

    }

    closeCommentModal = () => {
    this.setState({commentModalIsOpen: false});
    }

    setActiveCategory(e){

        let category = e.target.value;
        this.props.setActiveCategory(category);
        this.setPostsByCat(category);
       // window.location.reload();
    }






// ---------------------------------------------_ALL POSTS
    setPostsByCat(category){

        this.setState({category});

        if(category === 'all') {
            
            API.getPosts().then((posts) => { 
                this.props.setPosts(posts);
                this.setState({posts})
                // console.log('posts by cat',posts)
                // console.log('posts by cat',this.state.posts)
            })

        }else{

            API.getPostsByCat(category).then((posts) => {
                this.props.setPosts(posts);
                this.setState({posts})
                // console.log('posts by cat',posts)
                // console.log('posts by cat',this.state.posts)
            })

        }
        console.log(this.state)
    }





// ---------------------------------------------_FILTERING
    // todo: merge func with setPostByCat
    sortByDate(){
        let category = this.state.category;
        if(category === 'all') {
            API.getPosts().then((posts) => { 
                this.props.setPosts(posts)
                this.setState({posts})
            });
        }else{
            API.getPostsByCat(category).then((posts) => {
                this.props.setPosts(posts)
                this.setState({posts})
            });
        }

    }
    
    sortByVote(){

        API.getPosts().then((posts) => {
            this.props.setPostsByVote(posts);
            this.setState({posts})
        });
        console.log(this.state)
    }



    getPostsByCat(category){

        API.getPostsByCat(category).then((posts) => {
            this.props.setPostsByCat(posts);
            this.setState({posts})
            console.log()
        });

    }


    render() {
        const categories = this.props.categories;
        
        return (

            <div className="App">

{/* <nav className="c-appBar">

<Link to="/all">
    <h1 className="u-fl">Readable</h1>
</Link>


<button className="c-flatButton c-flatButton--grey" value="addPost" onClick={() => this.openAddCommentModal() }>add post</button>
<Link to='/create-new' className="c-flatButton" >Add new post</Link>

</nav>  */}

                <AppBar 
                    openPostModal = {this.openAddCommentModal}
                />
                <ToastContainer />
                
                <div className="c-posts_filter">

                    <div className="c-filter">
                        <label>Filter by:</label>

                        <ul className="c-filter_cat">

                            <li key="all">
                                <Link to={`/all`} >
                                    <button className="c-flatButton" value='all' onClick={this.setActiveCategory.bind(this)} >All</button> 
                                </Link>
                            </li>

                            { categories && categories.map((category) => (
                                <li key={category.name}>
                                    <Link to={`/${category.path}`} >
                                     <button className="c-flatButton" value={category.name} onClick={this.setActiveCategory.bind(this)} >{category.name}</button> 
                                    </Link> 
                                </li>
                            ))}
                            
                        </ul>

                    </div>

                    <div className="c-filter_order">

                        <label>Filter by:</label>
                        <button className="c-flatButton" onClick={this.sortByDate.bind(this)}>Date</button>
                        <button className="c-flatButton" onClick={this.sortByVote.bind(this)} >VoteScore</button>
                   
                    </div>

                </div>
                <Switch>
                    <Route exact path='/create-new'
                    render = {() => (
                    <AddPost/>
                    )}
                    />
                    
                    
                    <Route path='/:category' exact component={ Posts } />

                    <Route path='/:category/:id' exact component={ PostDetail } />

                    <Route path='/:category/:id/edit-post' exact component={ EditPost }/>
                    
                    <Route path='/:category/:id/add-comment' exact component={ AddComment } /> 
                    <Route path='/:id/:commentId/edit-comment' exact component={ EditComment } />
                    <Route path='/' component={Posts}/>
                </Switch>

                <Modal
                className='modal'
                overlayClassName='overlay'
                isOpen={this.state.commentModalIsOpen}
                //onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeCommentModal}
                contentLabel='Modal'
                >
                  
                    <AddPost
                    closeCommentModal={this.closeCommentModal}
                    />

                </Modal>
            </div>
 
        )
    }
}



function mapDispatchToProps( dispatch ){

    return{
        setPosts: (data) => dispatch(setPosts(data)),
        setCategories: (data) => dispatch(setCategories(data)),
        // setPostsByCat: (data) => dispatch(setPostsByCat(data)),
        setPostsByVote: (data) => dispatch(setPostsByVote(data)),
        setActiveCategory: (data) => dispatch(setActiveCategory(data))
    }

}


function mapStateToProps ({ categories, posts, category }) {

    return {
        categories,
        posts,
        category
    }

}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
//export default withRouter(connect()(App));