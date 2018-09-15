import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Order from './components/Order';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/orders/:id" component={Order} />
    </div>
  </Router>
);

export default App;
