import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './App.css';

import rootReducer from './reducers';

import Orders from './components/Orders';
import Order from './components/Order';
import NoMatch from './components/NoMatch';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/orders" />} />
        <Route path="/orders" component={Orders} />
        <Route path="/orders/:id" component={Order} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
