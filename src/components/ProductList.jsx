import React, { Component } from 'react';

import Product from './Product';

class ProductList extends Component {
  removeProduct(id) {
    const { products } = this.state;
    const { adjustTotal } = this.props;

    // remove certain quantity of product
    const updatedProduct = products.find(x => x['product-id'] === id);
    updatedProduct.quantity -= 1;

    // adjust the subtotal price
    updatedProduct.total -= updatedProduct['unit-price'];
    updatedProduct.total = updatedProduct.total.toFixed(2);

    let updatedProductList;

    // check if quantity is 0, then remove fully
    // otherwise adjust quantity
    if (updatedProduct.quantity < 1) {
      updatedProductList = products.filter(
        product => product['product-id'] !== id
      );
    } else {
      updatedProductList = products.map(product => {
        if (product['product-id'] === id) {
          return updatedProduct;
        }
        return product;
      });
    }

    this.setState({ products: updatedProductList });

    // adjust the top-level total price
    adjustTotal(updatedProduct['unit-price']);
  }

  render() {
    const { items } = this.props;

    if (!items) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {items.map(item => (
          <div key={item['product-id']}>
            <Product product={item.product} />
            <h3>Quantity: {item.quantity}</h3>
            <h3>Subtotal: {item.total}</h3>
            <button
              type="button"
              onClick={() => this.removeProduct(item['product-id'])}
            >
              Remove product
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default ProductList;
