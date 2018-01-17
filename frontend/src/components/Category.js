import React, { Component } from 'react';

class Category extends Component {
    render() {
        const { category } = this.props
        console.log(this.props)
        return(

            <div>
            
                <h1>cat:{category}</h1>

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
