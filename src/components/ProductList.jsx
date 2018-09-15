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

  render() {
    const { products } = this.state;

    if (!products) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {products.map(product => (
          <Product key={product['product-id']} product={product.product} />
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
  ).isRequired
};

export default ProductList;
