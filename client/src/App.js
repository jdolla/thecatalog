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
        activeNav: "home",
    }

    handleLogin = (userInfo, cb) => {
        this.setState({
            first_name: userInfo.first_name,
            isAuthenticated: true
        }, cb)
    }

    handleLogout = (cb) => {
        fetch("/api/user/logout", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache': 'no-cache'
              },
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            this.setState({
                first_name: "",
                isAuthenticated: false,
                isAdmin: false,
                isCreator: false,
            }, cb)
        })
    }

    componentWillMount = () => {
        if(document.cookie){
            const cookies = decodeURIComponent(document.cookie).split(';');
            cookies.forEach(cookie => {
                if(cookie.includes('thecatalog-info')){
                    const parts = cookie.split('=');
                    try {
                        const info = JSON.parse(parts[1]);
                        return this.setState({
                            first_name: info.first_name,
                            isAdmin: info.isAdmin,
                            isAuthenticated: true,
                            isReader: info.isReader,
                        })
                    } catch (error) {
                        return;
                    }
                }
            });
        }
    }



    secureRoute = (props) => {
        const target = props.location.pathname;

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
                        handleLogout={this.handleLogout}
                        activeNav={this.state.activeNav}/>
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
