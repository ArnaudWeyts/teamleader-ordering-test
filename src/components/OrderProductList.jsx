import React, { Component } from 'react';

import Product from './Product';
import { formatToPrice } from '../helpers';

class OrderProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      removeQuantity: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const {
      target: { name, type, checked, value }
    } = event;
    const newValue = type === 'checkbox' ? checked : value;

    this.setState({
      [name]: newValue
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
      <div>
        {items.map(item => (
          <div key={item['product-id']}>
            <Product product={item.product} />
            <h3>Quantity: {item.quantity}</h3>
            <h3>Subtotal: {formatToPrice(item.total)}</h3>
            <form onSubmit={e => this.handleSubmit(e, item['product-id'])}>
              <input
                type="number"
                name="removeQuantity"
                max={item.quantity}
                value={removeQuantity}
                onChange={this.handleInputChange}
              />
              <button type="submit">Remove product(s)</button>
            </form>
          </div>
        ))}
      </div>
    );
  }
}

export default OrderProductList;
