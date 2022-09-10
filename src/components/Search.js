import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductByQuery, getProductByCategories } from '../services/api';
import Card from './Card';

export default class Search extends Component {
  state = {
    search: '',
    productList: [],
    lista: [],
    categoryId: '',
  };

  handleList = async () => {
    const { categorid } = this.props;
    const { categoryId } = this.state;
    if (categorid !== categoryId) {
      console.log('tá chamando');
      if (categorid !== categoryId) {
        this.setState({ categoryId: categorid });
      }
      if (categorid !== null) {
        const queue = await getProductByCategories(categorid);
        const { results } = queue;
        this.setState({ lista: results });
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

  render() {
    const { productList, lista } = this.state;
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
              <Card
                key={ index }
                title={ item.title }
                price={ item.price }
                thumbnail={ item.thumbnail }
              />
            )) : <p>Nenhum produto foi encontrado</p>
          }
        </div>
        <div className="cardProduct">
          {
            lista.length >= 1 && lista.map((produto, index) => (
              <Card
                key={ index }
                title={ produto.title }
                price={ produto.price }
                thumbnail={ produto.thumbnail }
              />
            ))
          }
        </div>

      </form>
    );
  }
}

Search.propTypes = {
  categorid: PropTypes.string.isRequired,
};
