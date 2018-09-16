import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectOrder, removeProductFromOrder } from '../actions/ordersActions';

import ProductList from '../components/ProductList';
import Products from './Products';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProducts: false
    };
  }

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id }
      }
    } = this.props;

    dispatch(selectOrder(id));
  }

  addToOrder(id) {
    console.log(id);
  }

  render() {
    const { dispatch, order } = this.props;
    const { showProducts } = this.state;

    if (!order) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Order #{order.id}</h2>
        <h2>Items</h2>
        <ProductList
          items={order.items}
          removeProduct={(id, quantity) =>
            dispatch(removeProductFromOrder(id, quantity))
          }
        />
        <h2>Total: {order.total}</h2>
        <button type="button" onClick={() => console.log('order placed')}>
          Place order
        </button>
        <div>
          <button
            type="button"
            onClick={() => this.setState({ showProducts: true })}
          >
            Add an item
          </button>
          {showProducts && <Products addToOrder={this.addToOrder} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.orders.selectedOrder,
  products: state.orders.selectedOrderProducts
});

export default connect(mapStateToProps)(OrderDetail);
