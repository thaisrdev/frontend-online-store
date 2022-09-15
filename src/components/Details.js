import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Details extends Component {
  state = {
    product: undefined,
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    getProductById(id).then((response) => this.setState({ product: response })); // requisicao 4
  }

  render() {
    const { product } = this.state;

    if (product === undefined) {
      return <span>Carregando</span>;
    }

    return (
      <div>
        <h1 data-testid="product-detail-name">{product.title}</h1>
        <img data-testid="product-detail-image" src={ product.thumbnail } alt="" />
        <span data-testid="product-detail-price">{product.price}</span>
        <Link data-testid="shopping-cart-button" to="/Cart">carrinho</Link>
      </div>
    );
  }
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
