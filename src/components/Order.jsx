import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Button } from 'antd';

const Order = ({ order }) => (
  <Card>
    <h3>Order #{order.id}</h3>
    <Link to={`/orders/${order.id}`}>
      <Button type="primary">View</Button>
    </Link>
  </Card>
);

export default Order;
