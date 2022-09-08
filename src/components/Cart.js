import React, { Component } from 'react';

export default class Cart extends Component {
  render() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }
}

// Quando não existirem produtos no carrinho de compras, a página deve exibir a mensagem "Seu carrinho está vazio";
// Adicione o atributo data-testid com o valor shopping-cart-empty-message no elemento da mensagem.
