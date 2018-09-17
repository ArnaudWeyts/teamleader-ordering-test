import React from 'react';

import { formatToPrice } from '../helpers';

const Product = ({ product }) =>
  !product ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {formatToPrice(product.price)}</p>
    </div>
  );

export default Product;
