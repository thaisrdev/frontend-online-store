import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    this.renderCart();
  }

  renderCart = () => {
    if (localStorage.getItem('shoppingCart')) {
      const renderProducts = JSON.parse(localStorage.getItem('shoppingCart'));
      this.setState({ cartProducts: renderProducts });
    }
  };

  removeProduct = (parametro) => {
    const { cartProducts } = this.state;
    const findByIndex = cartProducts.findIndex((element) => element.id === parametro);
    const updatedArray = [...cartProducts.slice(0, findByIndex),
      ...cartProducts.slice((findByIndex + 1), (cartProducts.length))];
    this.setState({ cartProducts: updatedArray });
  };

  render() {
    const { cartProducts } = this.state;
    const quantity = 1; // mudar pra let se conseguir fazer adição e subtração
    return (
      <div>
        {
          cartProducts.map((element) => (
            <div key={ element.id }>
              <p data-testid="shopping-cart-product-name">{ element.title }</p>
              <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
              <p>{ element.price }</p>
              {/* <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseQuantity(element.id) }
              >
                +

              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseQuantity(element.id) }
              >
                -

              </button> */}
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.removeProduct(element.id) }
              >
                remover

              </button>
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
