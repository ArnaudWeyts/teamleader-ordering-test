import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/productActions';
import Product from '../components/Product';

class Products extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {
    const { isFetching, products, addToOrder } = this.props;

    if (isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {products.map(product => (
          <div key={product.id}>
            <Product product={product} />
            <button type="button" onClick={() => addToOrder(product.id)}>
              Add to order
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.products.isFetching,
  products: state.products.data
});

export default connect(mapStateToProps)(Products);
