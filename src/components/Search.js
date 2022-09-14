import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductByQuery, getProductByCategories } from '../services/api';
import Card from './Card';

export default class Search extends Component {
  state = {
    search: '',
    productList: [],
    categoryId: '',
    addItem: [],
  };

  handleList = async () => {
    const { categorid } = this.props;
    const { categoryId } = this.state;
    if (categorid !== categoryId) {
      if (categorid !== categoryId) {
        this.setState({ categoryId: categorid });
      }
      if (categorid !== null) {
        const queue = await getProductByCategories(categorid);
        const { results } = queue;
        this.setState({ productList: results });
      }
    }
  };

  handleChange = async ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onSaveButtonClick = async (event) => {
    const { target } = event;
    const { name, value } = target;
    const { search } = this.state;
    event.preventDefault();
    const list = await getProductByQuery(search);
    const { results } = list;
    getProductByQuery(search)
      .then(() => {
        this.setState({ [name]: value });
      })
      .then(() => {
        this.setState({ productList: results });
      });
  };

  addToCart = (produto) => {
    const { addItem } = this.state;
    this.setState({ addItem: [...addItem, produto] });
    localStorage.setItem('shoppingCart', JSON.stringify([...addItem, produto]));
  };

  render() {
    const { productList } = this.state;
    return (
      <form id="searchForm" onSubmit={ this.onSaveButtonClick }>
        <input
          type="text"
          data-testid="query-input"
          name="search"
          onChange={ this.handleChange }
          onSubmit={ this.handleList() }
        />
        <button
          type="submit"
          data-testid="query-button"
          name="pesquisar"
        >
          Pesquisar
        </button>
        <div className="cardProduct">
          {
            productList.length >= 1 ? productList.map((item, index) => (
              <div key={ index }>
                <Link
                  to={ `/product/${item.id}` }
                  data-testid="product-detail-link"
                >
                  <Card
                    key={ index }
                    title={ item.title }
                    price={ item.price }
                    thumbnail={ item.thumbnail }
                  />
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToCart(item) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>

            )) : <p>Nenhum produto foi encontrado</p>
          }
        </div>

      </form>
    );
  }
}

Search.propTypes = {
  categorid: PropTypes.string.isRequired,
};
