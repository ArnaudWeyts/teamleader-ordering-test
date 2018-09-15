import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => (
  <div>
    <p>Description: {product.description}</p>
    <p>Category: {product.category}</p>
    <p>Price: {product.price}</p>
  </div>
);

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.string
  }).isRequired
};

export default Product;
