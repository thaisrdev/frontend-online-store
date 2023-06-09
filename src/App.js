import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import Cart from './components/Cart';
import Details from './components/Details';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route path="/product/:id" component={ Details } />
          <Route path="/cart" component={ Cart } />
        </Switch>
      </BrowserRouter>

    );
  }
}
