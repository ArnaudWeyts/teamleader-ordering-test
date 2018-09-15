import React, { Component } from 'react';
import PropTypes from 'prop-types';

import allProducts from '../data/products.json';

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: null
    };
  }

  componentDidMount() {
    const { products } = this.props;

    const fullProducts = products.map(product => {
      const fullProduct = allProducts.find(x => x.id === product.id);
      return Object.assign({ product: fullProduct }, product);
    });

    this.this.setState({ products: fullProducts });
  }

  render() {
    const { products } = this.state;

    if (!products) {
      return <div>Loading...</div>;
    }

    return <div>ProductList</div>;
  }
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      'product-id': PropTypes.string,
      quantity: PropTypes.number,
      'unit-price': PropTypes.number,
      total: PropTypes.number
    })
  ).isRequired
};

export default ProductList;
