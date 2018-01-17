import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as  API from '../utils/ReadableAPI.js'; 
import { setCategories, setPosts, setPostsByCat, setPostsByVote } from '../actions/';

import { withRouter } from 'react-router-dom'
import Post from './Post'

//import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// TODO: convert to stateless function
class Posts extends Component {


    state = {
        posts:[]
    }


    componentDidMount() {

        API.getCategories().then((categories) => {
            this.props.setCategories(categories);
        });

        // get all posts, send to state for filtering
        API.getPosts().then((posts) => {
            this.props.setPosts(posts);
            this.setState({posts})
        });

    }

    sortByDate(){

        API.getPosts().then((posts) => {
            this.props.setPosts(posts);
            this.setState({posts})
        });

    }
    
    sortByVote(){

        API.getPosts().then((posts) => {
            this.props.setPostsByVote(posts);
            this.setState({posts})
        });

    }

    filterByCat(e){
        
        let category = e.target.value;

        // reset posts 
        if(category === 'all'){

            API.getPosts().then((posts) => { 
                this.props.setPosts(posts);
                this.setState({posts})
                console.log('posts all',this.state)
            });


        // filter posts by category
        }else{

            API.getPostsByCat(category).then((posts) => {
                this.props.setPostsByCat(category);
                this.setState({posts})
                console.log('posts by cat',this.state)
            });

        }


    }


    render() {
        const categories = this.props.categories
        const posts = this.state.posts
      
        return (

            <div className="c-posts">

                <div className="c-posts_filter">

                    <div className="c-filter">
                        <label>Filter by:</label>

                        <ul className="c-filter_cat">

                            <li key="all">
                                {/* <Link to={`/`} >{`all`}</Link> */}
                                <button className="c-flatButton" value='all' onClick={this.filterByCat.bind(this)} >All</button>
                            </li>

                            { categories && categories.map((category) => (
                                <li key={category.name}>
                                    {/* <Link 
                                    
                                    to={`${category.path}`} 
                                    // posts={ }
                                    >{category.name}</Link>  */}
                                    <button className="c-flatButton" value={category.name} onClick={this.filterByCat.bind(this)} >{category.name}</button>
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

                
                {
                posts.map((post,index) => 
                    <Post key={post.id} post={ post } />
                )
                }

            </div>
            
        )

    }

}




function mapDispatchToProps( dispatch ){

    return{
        setPosts: (data) => dispatch(setPosts(data)),
        setCategories: (data) => dispatch(setCategories(data)),
        setPostsByCat: (data) => dispatch(setPostsByCat(data)),
        setPostsByVote: (data) => dispatch(setPostsByVote(data))
    }

}


function mapStateToProps ({ categories, posts }) {

    return {
        categories,
        posts
    }

}



//export default connect(mapStateToProps)(App)
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Posts));
