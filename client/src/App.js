import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/login/login';
import OfferList from './components/offerlist/offerlist';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path="/offers" component={OfferList}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
