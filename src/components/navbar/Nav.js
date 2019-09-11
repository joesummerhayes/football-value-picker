import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css'

class Nav extends React.Component {
    render() {
        return (
            <div className="nav-center">
                <Link to="/">Premiership</Link>
                <Link to="/championship">Championship</Link>
                <Link to="/one">league 1</Link>
                <Link to="/two">League 2</Link>
            </div>
        )
    }
}


export default Nav;