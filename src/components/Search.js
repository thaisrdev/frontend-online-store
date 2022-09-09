import React, { Component } from 'react';
import { getProductByQuery } from '../services/api';
import Card from './Card';

export default class Search extends Component {
  state = {
    search: '',
    productList: [],
    lista: [],
    categoryId: '',
  };

  handleChange = async ({ target }) => {
    const { categorid } = this.props;
    const { categoryId } = this.state;
    const { name, value } = target;
    this.setState({ [name]: value }, this.setState({ categoryId: categorid }));
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

  handleLista = () => {
    const { categorid } = this.props;
    if (categorid.length > 0) console.log('é maior q 0');
  };

  render() {
    const { productList } = this.state;
    // this.teste(categorid);
    return (
      <form id="searchForm" onSubmit={ this.onSaveButtonClick }>
        <input
          type="text"
          data-testid="query-input"
          name="search"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="query-button"
          name="pesquisar"
          onClick={ this.handleLista }
        >
          Pesquisar
        </button>
        <div id="cardProduct">
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

      </form>
    );
  }
}
