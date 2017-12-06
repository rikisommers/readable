import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class Post extends Component {
    render() {
        const { category } = this.props
        console.log(this.props)
        return(

            <div>
            
                <h1>Test</h1>

            </div>
        )
    }
}


export default Category;

// function mapStateToProps({ posts }) {
//     return {
//         posts
//     }
// }
  
// export default connect(mapStateToProps)(PostsList)
