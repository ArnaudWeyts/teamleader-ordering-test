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

import Orders from './containers/Orders';
import OrderDetail from './containers/OrderDetail';
import NoMatch from './components/NoMatch';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Router>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/orders" />} />
        <Route exact path="/orders" component={Orders} />
        <Route path="/orders/:id" component={OrderDetail} />
        <Route component={NoMatch} />
      </Switch>
    </Provider>
  </Router>
);

export default App;
