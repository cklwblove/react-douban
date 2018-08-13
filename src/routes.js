import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './views/Home'
import List from './views/List';
import Board from './views/Board';
import Item from './views/Item';
import Search from './views/Search';

class Routes extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/board" component={Board}></Route>
            <Route path="/list" component={List}></Route>
            <Route path="/item" component={Item}></Route>
            <Route path="/search" component={Search}></Route>
            <Redirect from="/" to="/home"></Redirect>
            <Route component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
