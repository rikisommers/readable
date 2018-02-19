import React,{Component} from 'react'
import { Link } from 'react-router-dom'



class AppBar extends Component {


    
    componentDidMount() {

        console.log(this.props)
    }




    render() {
        return(
            
            <nav className="c-appBar">

                <Link to="/all">
                    <h1 className="u-fl">Readable</h1>
                </Link>

                
                <button className="c-flatButton c-flatButton--grey" value="addPost" onClick={() => this.props.openPostModal() }>add post</button>
                {/* <Link to='/create-new' className="c-flatButton" >Add new post</Link> */}


            </nav> 
        )
    }
}

export default AppBar