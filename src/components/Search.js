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

  // um fetch para carregar as categorias (3)
  // mais um fetch par quando clico num elemento das categorias

  handleList = async () => {
    const { categorid } = this.props;
    const { categoryId } = this.state;
    const queue = await getProductByCategories(categorid); // requisicao 2
    if (categorid !== categoryId) {
      if (categorid !== categoryId) {
        this.setState({ categoryId: categorid });
      }
      if (categorid !== null) {
        const { results } = queue;
        this.setState({ productList: results });
      }
    }
  };

  handleChange = async (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSaveButtonClick = async (event) => {
    const { target } = event;
    const { name, value } = target;
    const { search } = this.state;
    event.preventDefault();
    const list = await getProductByQuery(search); // requisicao 3
    const { results } = list;
    getProductByQuery(search)
      .then(() => {
        this.setState({ [name]: value });
      })
      .then(() => {
        this.setState({ productList: results });
      });
  };

  addToCart = (parametro) => {
    const { productList } = this.state;
    const produto = productList.find((element) => element.id === parametro);
    this.setState((prevState) => {
      localStorage
        .setItem('cart', JSON.stringify([...prevState.addItem, produto]));
      return ({
        addItem: [...prevState.addItem, produto],
      });
    });
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
          { (productList.length === 0) ? (<p>Nenhum produto foi encontrado</p>)
            : (productList.map((item) => (
              <div key={ item.id }>
                <Link
                  to={ `/product/${item.id}` }
                  data-testid="product-detail-link"
                >
                  <Card
                    title={ item.title }
                    price={ item.price }
                    thumbnail={ item.thumbnail }
                  />
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToCart(item.id) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>

            )))}
          ;
        </div>

      </form>
    );
  }
}

Search.propTypes = {
  categorid: PropTypes.string.isRequired,
};
