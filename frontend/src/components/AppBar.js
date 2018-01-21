import React from 'react';
import { Link } from 'react-router-dom'


const AppBar = () => {
    
    return(
        <nav className="c-appBar">

            <Link to="/all">
                <h1 className="u-fl">Readable</h1>
            </Link>

            <Link to='/create-new' className="c-flatButton" >Add new post</Link>

        </nav> 
    )
}

export default AppBar