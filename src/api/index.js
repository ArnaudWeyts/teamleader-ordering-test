/* eslint-disable class-methods-use-this */

import customers from './customers.json';
import orders from './orders.json';
import products from './products.json';

const SIMULATED_DELAY = 400;

export default class Api {
  getCustomers() {
    return new Promise(resolve => {
      setTimeout(() => resolve(customers), SIMULATED_DELAY);
    });
  }

  getOrders() {
    return new Promise(resolve => {
      setTimeout(() => resolve(orders), SIMULATED_DELAY);
    });
  }

  getProducts() {
    return new Promise(resolve => {
      setTimeout(() => resolve(products), SIMULATED_DELAY);
    });
  }
}
