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

  getProductsForOrder(id) {
    return new Promise(resolve => {
      const order = orders.find(x => x.id === id);

      const productsForOrder = order.items.map(item =>
        products.find(x => x.id === item['product-id'])
      );

      setTimeout(() => {
        resolve(productsForOrder);
      }, SIMULATED_DELAY);
    });
  }
}
