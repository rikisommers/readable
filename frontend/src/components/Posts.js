import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import Post from './Post'


class Posts extends Component {


    componentDidMount() {
        console.log('posts did mount')
        // let activeCategory = this.props.activeCategory;
        // this.setState({activeCategory})

    }


    render() {
        const posts = this.props.posts;
        var postsData;


        if(posts.length > 0){
            postsData = posts.map((post,index) => <Post key={post.id} post={ post } />
        )
        }else{
            postsData = <h3>There are no posts to display</h3>
        }

        return (

            <div className="c-posts">
            <h1>Posts : {this.props.activeCategory} {posts.length}</h1>
            <br />

                { postsData }

            </div>
            
        )

    }

}




// component state <- App
function mapStateToProps (state) {

    return {
        posts:state.posts,
        activeCategory:state.activeCategory
    }

}



//export default connect(mapStateToProps)(App)
export default withRouter(connect(mapStateToProps)(Posts));
