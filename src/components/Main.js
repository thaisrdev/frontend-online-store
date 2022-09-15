import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductByCategories } from '../services/api';
import Search from './Search';

export default class Main extends Component {
  state = {
    categories: [],
    productList: [],
    categoryId: '',
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categories: response }));
  }

  getCategoriesProducts = async (event) => { // requisicao 1
    const { target } = event;
    const { id } = target;
    getProductByCategories(id)
      .then(() => {
        this.setState({ categoryId: id });
      });
  };

  render() {
    const { categoryId, categories, productList } = this.state;
    return (
      <div id="categoryDiv">
        {' '}
        { categories.map((element, index) => (
          <label
            htmlFor="category"
            id={ index }
            key={ index }
          >
            {' '}
            {element.name}
            <input
              key={ element.id }
              data-testid="category"
              type="radio"
              name="category"
              id={ element.id }
              onChange={ this.getCategoriesProducts }
            />
          </label>))}

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
        <div className="categoryDiv">
          {productList.length >= 1 && this.getCategoriesProducts() }
        </div>
        <Search categorid={ categoryId } />
      </div>
    );
  }
}
