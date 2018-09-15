import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => (
  <div>
    <p>{product.description}</p>
    <p>{product.category}</p>
    <p>{product.price}</p>
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
