import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Search from './Search';

export default class Main extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categories: response }));
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        { categories.map((element) => (
          <label htmlFor="category" key={ element.id }>
            {' '}
            {element.name}
            <input data-testid="category" type="radio" id="category" />
          </label>))}

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/Cart">
          <button type="submit" data-testid="shopping-cart-button"> </button>
        </Link>
        <Search />
      </div>
    );
  }
}
