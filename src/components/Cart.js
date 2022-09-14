import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cart extends Component {
  // state = {
  //   productList: [],
  // };

  // componentDidMount() {
  //   const qualquerCoisa = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  //   this.setState({ productList: qualquerCoisa });
  // }

  render() {
    const { productList } = this.props;
    return (
      <div>
        {
          productList.map(({ title, id, price }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{ title }</p>
              <p data-testid="shopping-cart-product-quantity">{ 1 }</p>
              {/* Você deve adicionar esse atributo para todos os produtos na tela do carrinho */}
              <p>{ price }</p>
            </div>))
        }
        { productList.length === 0
        && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p> }

      </div>
    );
  }
}

Cart.propTypes = {
  productList: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;
