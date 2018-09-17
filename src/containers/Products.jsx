import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card } from 'antd';

import { fetchProducts } from '../actions/productActions';

import Loading from '../components/Loading';
import Product from '../components/Product';

class Products extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProducts());
  }

  render() {
    const { isFetching, products, addToOrder } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div>
        {products.map(product => (
          <Card key={product.id}>
            <Product product={product} />
            <Button type="button" onClick={() => addToOrder(product.id, 1)}>
              Add to order
            </Button>
          </Card>
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
