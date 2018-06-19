import React, { Component } from 'react';
import './login.css';

class Login extends Component{

    render() {
        return (
            <div className="Login">
                <div className="login-title">
                    Login to Catalog
                </div>
                <form className="login-form">
                    <input type="text" placeholder="email address" name="email"/>
                    <br/>
                    <input type="password" placeholder="password" name="password"/>
                    <br/>
                    <div className="login-btn-div">
                        <button className="login-btn">login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;