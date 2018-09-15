import React, { Component } from 'react';
import PropTypes from 'prop-types';

import allProducts from '../data/products.json';

import Product from './Product';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null
    };
  }

  componentDidMount() {
    const { items } = this.props;

    // enrich the product list, replace with possible API request
    const products = items.map(item => {
      const fullProduct = allProducts.find(
        product => product.id === item['product-id']
      );
      return Object.assign({ product: fullProduct }, item);
    });

    this.setState({ products });
  }

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
    const { products } = this.state;

    if (!products) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {products.map(product => (
          <div key={product['product-id']}>
            <Product product={product.product} />
            <h3>Quantity: {product.quantity}</h3>
            <h3>Subtotal: {product.total}</h3>
            <button
              type="button"
              onClick={() => this.removeProduct(product['product-id'])}
            >
              Remove product
            </button>
          </div>
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      'product-id': PropTypes.string,
      quantity: PropTypes.string,
      'unit-price': PropTypes.string,
      total: PropTypes.string
    })
  ).isRequired,
  adjustTotal: PropTypes.func.isRequired
};

export default ProductList;
