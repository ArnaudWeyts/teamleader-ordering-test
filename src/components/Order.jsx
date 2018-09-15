import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order }) => (
  <div>
    <h3>Order #{order.id}</h3>
    <Link to={`/orders/${order.id}`}>
      <button type="button">View</button>
    </Link>
  </div>
);

export default Order;
