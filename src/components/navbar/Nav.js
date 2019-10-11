import React from 'react';
import {Link} from 'react-router-dom';
import Sidebar from './SideBar';
import './nav.css'

class Nav extends React.Component {
    state = {
        sideBar: false
    }
    render() {
        return (
            <div>
                <div className="ui four item menu nav-menu">
                    <div className="item">
                        <Link to="/prem">
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
                <div onClick={() => this.setState({sideBar: !this.state.sideBar})}>
                    <div className="burger">
                        <div className="ui one menu">
                            <div className="item">
                                    <div className="nav-division">
                                    <i class={this.state.sideBar ? "angle double up icon" : "angle double down icon"}></i>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.sideBar ? "nav-mobile" : "hide"} >
                    <Sidebar />
                </div>
            </div>
        )
    }
}


export default Nav;