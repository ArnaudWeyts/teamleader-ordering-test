import React from 'react';

import { Skeleton } from 'antd';

import { formatToPrice } from '../helpers';

const Product = ({ product }) => (
  <Skeleton loading={!product} active>
    {product ? (
      <div>
        <p>Description: {product.description}</p>
        <p>Category: {product.category}</p>
        <p>Price: {formatToPrice(product.price)}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </Skeleton>
);

export default Product;
