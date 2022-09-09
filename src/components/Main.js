import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCategories, getProductByCategories } from '../services/api';
import Search from './Search';
import Card from './Card';

export default class Main extends Component {
  state = {
    categories: [],
    productList: [],
    categoryId: '',
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categories: response }));
  }

  getCategoriesProducts = async (event) => {
    const { productList } = this.state;
    const { target } = event;
    const { id } = target;
    console.log(id);
    const queue = await getProductByCategories(id);
    const { results } = queue;
    getProductByCategories(id)
      .then(() => {
        this.setState({ categoryId: id });
      });
  };

  render() {
    const { categoryId, categories, productList } = this.state;
    const { id } = this.props;
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
              onChange={ this.getCategoriesProducts.bind(id) }
            />
          </label>))}

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/Cart">
          <button type="submit" data-testid="shopping-cart-button"> </button>
        </Link>
        <div className="categoryDiv">
          {productList.length >= 1 && this.getCategoriesProducts() }
        </div>
        <Search categorid={ categoryId } />
      </div>
    );
  }
}

Main.propTypes = {
};
