import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css'

class Nav extends React.Component {
    render() {
        return (
            <div className="ui four item menu">
                <div className="item">
                    <Link to="/">
                        <div className="nav-division">Premiership</div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/championship">
                        <div className="nav-division">Championship</div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/one">
                        <div className="nav-division">League 1</div>
                    </Link>
                </div>
                <div className="item">
                    <Link to="/two">
                        <div className="nav-division">League 2</div>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Nav;