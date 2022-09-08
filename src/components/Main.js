import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
  render() {
    return (
      <div>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/Cart">
          <button type="submit" data-testid="shopping-cart-button"> </button>
        </Link>
      </div>
    );
  }
}
