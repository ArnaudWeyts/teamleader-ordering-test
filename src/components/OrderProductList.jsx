import React, { Component } from 'react';

import { Card, Button, InputNumber } from 'antd';

import Product from './Product';
import { formatToPrice } from '../helpers';

class OrderProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeQuantity: 1
    };

    this.handleInputNumberChange = this.handleInputNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputNumberChange(number) {
    this.setState({
      removeQuantity: number
    });
  }

  handleSubmit(e, id) {
    e.preventDefault();
    const { removeProduct } = this.props;
    const { removeQuantity } = this.state;
    removeProduct(id, removeQuantity);
  }

  render() {
    const { items } = this.props;
    const { removeQuantity } = this.state;

    if (!items) {
      return <div>Loading...</div>;
    }

    return (
      <div style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
        {items.map(item => (
          <Card key={item['product-id']}>
            <Product product={item.product} />
            <h3>Quantity: {item.quantity}</h3>
            <h3>Subtotal: {formatToPrice(item.total)}</h3>
            <form onSubmit={e => this.handleSubmit(e, item['product-id'])}>
              <InputNumber
                name="removeQuantity"
                min={1}
                max={+item.quantity}
                value={removeQuantity}
                onChange={this.handleInputNumberChange}
              />
              <Button type="default" htmlType="submit">
                Remove product(s)
              </Button>
            </form>
          </Card>
        ))}
      </div>
    );
  }
}

export default OrderProductList;
