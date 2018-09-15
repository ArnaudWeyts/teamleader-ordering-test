import React, { Component } from 'react';
import { connect } from 'react-redux';

// import ProductList from '../components/ProductList';
import { selectOrder } from '../actions/ordersActions';

class OrderDetail extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id }
      }
    } = this.props;

    dispatch(selectOrder(id));
  }

  render() {
    const { order } = this.props;

    if (!order) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Order #{order.id}</h2>
        <h2>Items</h2>
        {/* <ProductList items={order.items} adjustTotal={this.adjustTotal} /> */}
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

const mapStateToProps = state => ({
  order: state.orders.selectedOrder,
  products: state.orders.electOrderProducts
});

export default connect(mapStateToProps)(OrderDetail);
