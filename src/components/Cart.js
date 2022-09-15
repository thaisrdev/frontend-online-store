import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    this.renderCart();
  }

  renderCart = () => {
    if (localStorage.getItem('cart')) {
      const renderProducts = JSON.parse(localStorage.getItem('cart'));
      this.setState({ cartProducts: renderProducts });
    }
  };

  render() {
    const { cartProducts } = this.state;
    const quantity = 1;
    return (
      <div>
        {
          cartProducts.map((element) => (
            <div key={ element.id }>
              <p data-testid="shopping-cart-product-name">{ element.title }</p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
              <p>{ element.price }</p>
            </div>))
        }
        {
          (cartProducts.length === 0)
            && (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
        }

      </div>
    );
  }
}

export default Cart;
