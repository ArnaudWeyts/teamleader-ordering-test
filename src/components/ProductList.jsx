import React from 'react';

import Product from './Product';

const ProductList = props => {
  const { items, removeProduct } = props;

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
            onClick={() => removeProduct(item['product-id'], 1)}
          >
            Remove product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
