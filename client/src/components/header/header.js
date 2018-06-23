import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';


class Header extends Component{
    render(){
        const nav = this.props.activeNav;
        return(
            <div className="Header">
                <div className="header-logobox">
                </div>
                <div className="title">
                    Goat Squirt
                </div>
                <div className="nav">
                    <Link to="/" className={nav === 'home'}>Home</Link>
                    <Link to="/users">Users</Link>
                    <a href="#">Logout</a>
                </div>
            </div>
        )
    }
}

export default Header;