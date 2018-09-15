import React, { Component } from 'react';
import PropTypes from 'prop-types';

import orders from '../data/orders.json';
import ProductList from './ProductList';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: null
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    // Get order from list, replace with possible API request
    const order = orders.find(x => x.id === id);

    this.setState({ order });
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return <div>Loading...</div>;
    }

    return <ProductList items={order.items} />;
  }
}

Order.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Order;
