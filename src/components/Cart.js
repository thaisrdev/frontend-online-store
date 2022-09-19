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
    const updatedArray = [...cartProducts.slice(0, findByIndex), // no slice o segundo valor é não incluso
      ...cartProducts.slice((findByIndex + 1), (cartProducts.length))];
    this.setState({ cartProducts: updatedArray });
  };

  increaseQuantity = (parametro) => {
    const { cartProducts } = this.state;
    const updatedArray = cartProducts.map((element) => {
      const { available_quantity: availableQuantity } = element;
      if (element.id === parametro && availableQuantity > element.order_backend) {
        element.order_backend += 1;
        return element;
      }
      return element;
    });
    this.setState({
      cartProducts: updatedArray,
    });
  };

  decreaseQuantity = (parametro) => {
    const { cartProducts } = this.state;
    const produto = cartProducts.find((element) => element.id === parametro);
    if (produto.order_backend > 1) {
      produto.order_backend -= 1;
    }
    if (produto.order_backend === 1) {
      this.removeProduct(produto.id);
    }
    this.setState({
      cartProducts,
    });
  };

  render() {
    const { cartProducts } = this.state;
    // const quantity = 1; // mudar pra let se conseguir fazer adição e subtração
    return (
      <div>
        {
          cartProducts.map((element) => (
            <div key={ element.id }>
              <p data-testid="shopping-cart-product-name">{ element.title }</p>
              <p data-testid="shopping-cart-product-quantity">
                { element.order_backend }

              </p>
              <p>{ element.price }</p>
              <button
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

              </button>
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
