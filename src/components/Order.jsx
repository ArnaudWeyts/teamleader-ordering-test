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

    this.adjustTotal = this.adjustTotal.bind(this);
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

  adjustTotal(unitPrice) {
    const { order } = this.state;

    order.total -= unitPrice;
    order.total = order.total.toFixed(2);

    this.setState({ order });
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Order #{order.id}</h2>
        <h2>Items</h2>
        <ProductList items={order.items} adjustTotal={this.adjustTotal} />
        <button type="button" onClick={() => console.log('add item')}>
          Add an item
        </button>
        <h2>Total: {order.total}</h2>
        <button type="button" onClick={() => console.log('order placed')}>
          Place order
        </button>
      </div>
    );
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
