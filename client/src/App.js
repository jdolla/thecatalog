import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/login/login';
import Route from 'react-router-dom/Route';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
