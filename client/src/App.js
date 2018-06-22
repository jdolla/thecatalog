import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/login/login';
import OfferList from './components/offerlist/offerlist';
import UserList from './components/userlist/userlist';
import ErrorPage from './components/errorpage/errorpage';

class App extends Component {
    state = {
        first_name: "",
        isAuthenticated: false,
        isAdmin: false,
        isCreator: false,
    }

    handleLogin = (userInfo, cb) => {
        this.setState({
            first_name: userInfo.first_name,
            isAuthenticated: true
        }, cb)
    }

    handleLogout = () => {
        this.setState({
            first_name: "",
            isAuthenticated: false,
            isAdmin: false,
            isCreator: false,
        })
    }

    secureRoute = (props) => {
        const target = props.location.pathname;
        console.log(target)
        if(!this.state.isAuthenticated || target === "/login"){
            return (<Login {...props} handleLogin={this.handleLogin}/>);
        } else {
            let goTo = "";
            switch (target) {
                case "/users":
                    goTo = (<UserList {...props} />);
                    break;

                case "/":
                    goTo = (<OfferList {...props} />);
                    break;

                default:
                    goTo = (<ErrorPage {...props} />);
                    break;
            }
            return(goTo);
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header
                        isAuthenticated={this.state.isAuthenticated}
                        first_name={this.state.first_name}
                        isAdmin={this.state.isAdmin}
                        logoutHandler={this.logoutHandler}/>
                    <Switch>
                        <Route exact path="/" render={this.secureRoute}/>
                        <Route exact path="/users" render={this.secureRoute}/>
                        <Route exact path="/login" render={this.secureRoute} />
                        <Route component={ErrorPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
