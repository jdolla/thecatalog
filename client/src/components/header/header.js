import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';


class Header extends Component{
    logoutClickHandler = () => {
        this.props.handleLogout(() => {
            console.log('hi')
        })
    }
    render(){
        return(
            <div className="Header">
                <div className="header-logobox">
                </div>
                <div className="title">
                    Goat Squirt
                </div>
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <a href="/" onClick={this.logoutClickHandler}>Logout</a>
                </div>
            </div>
        )
    }
}

export default Header;