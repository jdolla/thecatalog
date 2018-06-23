import React, { Component } from 'react';
import './login.css';

class Login extends Component{
    state = {
        email: "",
        password: "",
        shake: false,
        errorMessage: "",
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const req = {
            email: this.state.email,
            password: this.state.password,
        }

        fetch('/api/user/login', {
            body: JSON.stringify(req),
            headers: {
                "content-type": "application/json",
                'Accept': 'application/json',
            },
            method: 'POST',
            credentials: 'same-origin',
        }).then( resp => {
            if(!resp.ok){
                throw Error(resp.status);
            }
            return resp.json();
        }).then( data => {
            this.props.handleLogin(data, () => {
                this.props.history.push(this.props.backTo);
            });
        }).catch( err => {
            console.log(err)
            this.setState({
                shake: true,
                errorMessage: "invalid username or password",
                first_name: "",
                authenticated: false,
            })
        })
    }

    handleChange = (event) => {
        const target = event.target.name;
        const newVal = event.target.value;
        this.setState({
            [`${target}`]: newVal,
        })
    }

    render() {
        const shake = this.state.shake;
        return (
            <div className={(shake) ? 'Login shake' : 'Login'}
                onAnimationEnd={() => this.setState({shake: false})} >

                <div className="login-title">
                    Login to Catalog
                </div>
                <form className="login-form">
                    <input
                        type="text"
                        placeholder="email address"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <div className="login-footer">
                        <div className="login-message">
                            {this.state.errorMessage}
                        </div>
                        <div className="login-btn-div">
                            <button className="login-btn" onClick={this.handleSubmit}>login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;