import React from 'react';

import { orderType } from '../types';

const Order = ({ order }) => <div>{order.id}</div>;

Order.propTypes = orderType;

export default Order;
