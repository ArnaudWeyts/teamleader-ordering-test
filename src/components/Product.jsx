import React from 'react';

const Product = ({ product }) =>
  !product ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
    </div>
  );

export default Product;
