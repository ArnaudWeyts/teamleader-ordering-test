import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchOrders } from '../actions/ordersActions';

import Loading from '../components/Loading';
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
      return <Loading />;
    }

    return (
      <div>
        {allOrders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(mapStateToProps)(Orders);
