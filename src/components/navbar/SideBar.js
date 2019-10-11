import React from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends React.Component {
    state = {
        sideBar: false
    }

    render() {
        return (
            <div className={this.state.sideBar ? "nav-mobile" : ""} onClick={() => this.setState({sideBar: !this.state.sideBar})}>
                <div>
                    <li className="sidebar-link">
                        <Link to="/prem">
                            <div className="nav-division">prem</div>
                        </Link>
                    </li>
                    <li className="sidebar-link">
                        <Link to="/championship">
                            <div className="nav-division">championship</div>
                        </Link>
                    </li>
                    <li className="sidebar-link">
                        <Link to="/one">
                            <div className="nav-division">league 1</div>
                        </Link>
                    </li>
                    <li className="sidebar-link">
                        <Link to="/two">
                            <div className="nav-division">league 2</div>
                        </Link>
                    </li>
                </div>
            </div>
        )
    }
}

export default Sidebar;