import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import OfferList from './components/offerlist/offerlist';

class App extends Component {
    state = {
        first_name: "",
        isAuthenticated: false,
        isAdmin: false,
        isCreator: false,
    }

    loginRoute = (props) => {
        console.log(props)
        return (
            <Login {...props} handleLogin={this.handleLogin}/>
        )
    }

    offersRoute = (props) => {
        console.log(props)
        if(this.state.isAuthenticated){
            return (
                <OfferList />
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

    handleLogin = (userInfo, cb) => {
        this.setState({
            first_name: userInfo.first_name,
            isAuthenticated: true
        }, cb)
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" render={this.offersRoute}/>
                        <Route exact path="/login" render={this.loginRoute} />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
