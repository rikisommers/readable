import React from 'react';
import { Link } from 'react-router-dom'


const AppBar = () => {
    
    return(
        <nav className="c-appBar">

            <Link to="/">
                <h1 className="u-fl">Title</h1>
            </Link>

            <Link to={`/add`} className="c-flatButton" >add </Link>

        </nav> 
    )
}

export default AppBar