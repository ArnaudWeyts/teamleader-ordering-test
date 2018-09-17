import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  selectOrder,
  removeProductFromOrder,
  addProductToOrder,
  placeOrder
} from '../actions/ordersActions';

import OrderProductList from '../components/OrderProductList';
import Products from './Products';

import { formatToPrice } from '../helpers';

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
        <OrderProductList
          items={order.items}
          removeProduct={(id, quantity) =>
            dispatch(removeProductFromOrder(id, quantity))
          }
        />
        <h2>Total: {formatToPrice(order.total)}</h2>
        <button type="button" onClick={() => dispatch(placeOrder())}>
          Place order
        </button>
        <div>
          <button
            type="button"
            onClick={() => this.setState({ showProducts: true })}
          >
            Add an item
          </button>
          {showProducts && (
            <Products
              addToOrder={(id, quantity) =>
                dispatch(addProductToOrder(id, quantity))
              }
            />
          )}
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
