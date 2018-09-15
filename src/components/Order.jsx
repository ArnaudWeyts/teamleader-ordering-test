import React, { Component } from 'react';
import PropTypes from 'prop-types';

import orders from '../data/orders.json';

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

    this.setState({ order: orders.find(order => order.id === id) });
  }

  render() {
    const { order } = this.state;

    if (!order) {
      return <div>Loading...</div>;
    }

    return <div>{order.id}</div>;
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
