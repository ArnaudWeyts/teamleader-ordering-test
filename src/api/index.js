/* eslint-disable class-methods-use-this */

import customers from './customers.json';
import orders from './orders.json';
import products from './products.json';

export default class Api {
  getCustomers() {
    return new Promise(resolve => {
      resolve(customers);
    });
  }

  getOrders() {
    return new Promise(resolve => {
      resolve(orders);
    });
  }

  getProducts() {
    return new Promise(resolve => {
      resolve(products);
    });
  }
}
