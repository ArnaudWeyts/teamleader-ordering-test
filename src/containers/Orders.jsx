import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ordersType } from '../types';

import { fetchOrders } from '../actions/ordersActions';

import Order from '../components/Order';

class Orders extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchOrders());
  }

  render() {
    const {
      orders: { allOrders, isFetching }
    } = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Orders</h2>
        {allOrders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    );
  }
}

Orders.propTypes = ordersType;

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps)(Orders);
