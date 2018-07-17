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
                    <img href="https://thecatalog.herokuapp.com/" className="logo" src="./goat.png" alt="logo"/>
                </div>
                <div className="title">
                    <img className="name" src="./images/logo.png" alt="name"/>
                </div>
                <div className="nav">
                    <Link to="/">Catalog</Link>
                    <Link to="/users">Users</Link>
                    <a href="/" onClick={this.logoutClickHandler}>Logout</a>
                </div>
            </div>
        )
    }
}

export default Header;