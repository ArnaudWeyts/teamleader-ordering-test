import React from 'react';
import { Link } from 'react-router-dom';

import { orderType } from '../types';

const Order = ({ order }) => (
  <div>
    <h3>Order #{order.id}</h3>
    <Link to={`/orders/${order.id}`}>
      <button type="button">View</button>
    </Link>
  </div>
);

Order.propTypes = orderType;

export default Order;
