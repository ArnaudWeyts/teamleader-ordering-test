import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal } from 'antd';

import {
  selectOrder,
  removeProductFromOrder,
  addProductToOrder,
  placeOrder
} from '../actions/ordersActions';

import Loading from '../components/Loading';
import OrderProductList from '../components/OrderProductList';
import Products from './Products';

import { formatToPrice } from '../helpers';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProducts: false
    };

    this.hideModal = this.hideModal.bind(this);
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

  hideModal() {
    this.setState({ showProducts: false });
  }

  render() {
    const { dispatch, order } = this.props;
    const { showProducts } = this.state;

    if (!order) {
      return <Loading />;
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
        <div>
          <Button
            type="default"
            onClick={() => this.setState({ showProducts: true })}
          >
            Add an item
          </Button>
          <Modal
            title="Add products"
            visible={showProducts}
            onCancel={this.hideModal}
            onOk={this.hideModal}
            footer={null}
          >
            <Products
              addToOrder={(id, quantity) =>
                dispatch(addProductToOrder(id, quantity))
              }
            />
          </Modal>
        </div>
        <h2>Total: {formatToPrice(order.total)}</h2>
        <Button type="primary" onClick={() => dispatch(placeOrder())}>
          Place order
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.orders.selectedOrder,
  products: state.orders.selectedOrderProducts
});

export default connect(mapStateToProps)(OrderDetail);
